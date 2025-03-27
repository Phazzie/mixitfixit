import { readFileSync } from 'fs';
import { glob } from 'glob';

interface ValidationError {
    file: string;
    message: string;
}

class SolidValidator {
    private errors: ValidationError[] = [];

    async validate(): Promise<boolean> {
        const files = await glob('src/**/*.ts');
        
        for (const file of files) {
            if (file.includes('.test.ts')) continue;
            
            const content = readFileSync(file, 'utf8');
            this.validateSRP(file, content);
            this.validateISP(file, content);
        }

        if (this.errors.length > 0) {
            console.error('SOLID Validation Errors:');
            this.errors.forEach(error => {
                console.error(`${error.file}: ${error.message}`);
            });
            return false;
        }

        return true;
    }

    private validateSRP(file: string, content: string) {
        // Check for multiple class definitions
        const classMatches = content.match(/class\s+\w+/g) || [];
        if (classMatches.length > 1) {
            this.errors.push({
                file,
                message: 'Multiple classes in single file (violates SRP)'
            });
        }

        // Check function length
        const functionBlocks = content.match(/\{([^{}]*)\}/g) || [];
        functionBlocks.forEach(block => {
            const lines = block.split('\n').length;
            if (lines > 20) {
                this.errors.push({
                    file,
                    message: `Function exceeds 20 lines (${lines} lines)`
                });
            }
        });
    }

    private validateISP(file: string, content: string) {
        if (!file.includes('I') || !file.endsWith('.ts')) return;

        const methodCount = (content.match(/\w+\s*\([^)]*\)\s*:/g) || []).length;
        if (methodCount > 3) {
            this.errors.push({
                file,
                message: `Interface has too many methods (${methodCount})`
            });
        }
    }
}

// Run validation
const validator = new SolidValidator();
validator.validate()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
        console.error('Validation failed:', error);
        process.exit(1);
    });