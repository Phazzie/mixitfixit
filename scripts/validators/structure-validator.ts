import { Project, SourceFile } from 'ts-morph';
import * as path from 'path';

interface ValidationRule {
    name: string;
    validate: (file: SourceFile) => ValidationIssue[];
}

interface ValidationIssue {
    file: string;
    message: string;
    severity: 'error' | 'warning';
    line?: number;
    suggestion?: string;
}

export class StructureValidator {
    private project: Project;
    private rules: ValidationRule[] = [
        {
            name: 'Single Class Per File',
            validate: (file: SourceFile): ValidationIssue[] => {
                const classes = file.getClasses();
                if (classes.length > 1) {
                    return [{
                        file: file.getFilePath(),
                        message: `File contains ${classes.length} classes. Should only have one.`,
                        severity: 'error',
                        suggestion: 'Split classes into separate files'
                    }];
                }
                return [];
            }
        },
        {
            name: 'Interface Size',
            validate: (file: SourceFile): ValidationIssue[] => {
                const interfaces = file.getInterfaces();
                return interfaces.flatMap(int => {
                    const methods = int.getMethods();
                    if (methods.length > 3) {
                        return [{
                            file: file.getFilePath(),
                            message: `Interface ${int.getName()} has ${methods.length} methods. Max allowed is 3.`,
                            severity: 'warning',
                            suggestion: 'Split interface into smaller interfaces'
                        }];
                    }
                    return [];
                });
            }
        },
        {
            name: 'Function Length',
            validate: (file: SourceFile): ValidationIssue[] => {
                const functions = file.getFunctions();
                const methods = file.getClasses().flatMap(c => c.getMethods());
                
                return [...functions, ...methods].flatMap(func => {
                    const lines = func.getBody()?.getText().split('\n').length ?? 0;
                    if (lines > 20) {
                        return [{
                            file: file.getFilePath(),
                            message: `Function ${func.getName()} is ${lines} lines long. Max allowed is 20.`,
                            severity: 'error',
                            line: func.getStartLineNumber(),
                            suggestion: 'Extract logic into smaller functions'
                        }];
                    }
                    return [];
                });
            }
        }
    ];

    constructor() {
        this.project = new Project({
            tsConfigFilePath: "tsconfig.json"
        });
    }

    async validate(): Promise<ValidationIssue[]> {
        const sourceFiles = this.project.getSourceFiles();
        const issues: ValidationIssue[] = [];

        for (const file of sourceFiles) {
            for (const rule of this.rules) {
                const ruleIssues = rule.validate(file);
                issues.push(...ruleIssues);
            }
        }

        return issues;
    }

    async validateAndPrint(): Promise<boolean> {
        const issues = await this.validate();
        
        if (issues.length > 0) {
            console.log('\nStructure Validation Issues:');
            issues.forEach(issue => {
                const relativePath = path.relative(process.cwd(), issue.file);
                const location = issue.line ? `:${issue.line}` : '';
                const severity = issue.severity.toUpperCase();
                console.log(`\n[${severity}] ${relativePath}${location}`);
                console.log(`  ${issue.message}`);
                if (issue.suggestion) {
                    console.log(`  Suggestion: ${issue.suggestion}`);
                }
            });
            return false;
        }
        
        console.log('✓ Structure validation passed');
        return true;
    }
}

// Run validator if called directly
if (require.main === module) {
    const validator = new StructureValidator();
    validator.validateAndPrint()
        .then(success => process.exit(success ? 0 : 1));
}