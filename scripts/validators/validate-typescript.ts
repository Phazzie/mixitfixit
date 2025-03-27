import { Project } from 'ts-morph';

class TypeScriptValidator {
    private project: Project;

    constructor() {
        this.project = new Project({
            tsConfigFilePath: "tsconfig.json"
        });
    }

    async validate(): Promise<boolean> {
        const diagnostics = this.project.getPreEmitDiagnostics();
        
        if (diagnostics.length > 0) {
            console.error("TypeScript Validation Errors:");
            diagnostics.forEach(diagnostic => {
                console.error(diagnostic.getMessageText());
            });
            return false;
        }
        return true;
    }
}

export const validateTypeScript = async () => {
    const validator = new TypeScriptValidator();
    return validator.validate();
};