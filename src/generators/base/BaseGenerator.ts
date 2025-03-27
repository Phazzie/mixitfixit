import { Project, SourceFile, ClassDeclaration, InterfaceDeclaration } from 'ts-morph';

export abstract class BaseGenerator {
    protected project: Project;

    constructor(tsConfigPath: string = "tsconfig.json") {
        this.project = new Project({
            tsConfigFilePath: tsConfigPath
        });
    }

    protected getSourceFile(filePath: string): SourceFile | undefined {
        return this.project.getSourceFile(filePath);
    }

    protected getClasses(sourceFile: SourceFile): ClassDeclaration[] {
        return sourceFile.getClasses();
    }

    protected getInterfaces(sourceFile: SourceFile): InterfaceDeclaration[] {
        return sourceFile.getInterfaces();
    }

    protected async saveFile(filePath: string, content: string): Promise<void> {
        const sourceFile = this.project.createSourceFile(filePath, content, { overwrite: true });
        await sourceFile.save();
    }

    abstract generate(...args: any[]): Promise<void>;
}