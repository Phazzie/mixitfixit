export class SRPValidator implements IStructureValidator {
    async validateFile(filePath: string): Promise<ValidationResult> {
        const issues: ValidationIssue[] = [];
        const content = await readFile(filePath, 'utf-8');
        
        // Check function length (max 20 lines)
        const functions = parseFunctions(content);
        for (const func of functions) {
            if (func.lines > 20) {
                issues.push({
                    type: 'SRP',
                    message: `Function ${func.name} has ${func.lines} lines (max 20)`,
                    filePath,
                    fix: async () => await suggestFunctionSplit(func)
                });
            }
        }

        // Check class responsibilities
        const classes = parseClasses(content);
        for (const cls of classes) {
            if (cls.methods.length > 3) {
                issues.push({
                    type: 'SRP',
                    message: `Class ${cls.name} has too many responsibilities`,
                    filePath
                });
            }
        }

        return {
            isValid: issues.length === 0,
            issues
        };
    }
}