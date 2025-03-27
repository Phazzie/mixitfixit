import { TestGenerator } from '../src/generators/TestGenerator';
import { glob } from 'glob';
import path from 'path';

async function main() {
    const generator = new TestGenerator();
    
    // Find all TypeScript files (excluding test files and interfaces)
    const files = await glob('src/**/*.ts', {
        ignore: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/I*.ts']
    });

    console.log('🔍 Found files to process:', files.length);

    for (const file of files) {
        try {
            console.log(`📝 Generating tests for ${file}`);
            await generator.generate(file);
        } catch (error) {
            console.error(`❌ Error generating tests for ${file}:`, error);
        }
    }

    console.log('✅ Test generation complete!');
}

main().catch(console.error);
