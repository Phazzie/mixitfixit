import { Project } from 'ts-morph';

class DocsGenerator {
    private project: Project;

    constructor() {
        this.project = new Project({
            tsConfigFilePath: "tsconfig.json"
        });
    }

    async generateDocs(): Promise<void> {
        const sourceFiles = this.project.getSourceFiles();
        
        for (const sourceFile of sourceFiles) {
            const classes = sourceFile.getClasses();
            
            for (const cls of classes) {
                const documentation = this.generateClassDocs(cls);
                // Save documentation to markdown file
                // Implementation details here
            }
        }
    }

    private generateClassDocs(cls: ClassDeclaration): string {
        const className = cls.getName();
        const methods = cls.getMethods();
        
        return `
# ${className}

## Responsibility
Single responsibility for this class: [TODO]

## Methods
${methods.map(method => `
### ${method.getName()}
${method.getJsDocs().map(doc => doc.getDescription()).join('\n')}
`).join('\n')}
`;
    }
}