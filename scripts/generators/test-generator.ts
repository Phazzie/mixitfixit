import { Project, SourceFile, ClassDeclaration } from 'ts-morph';

class TestGenerator {
    private project: Project;

    constructor() {
        this.project = new Project({
            tsConfigFilePath: "tsconfig.json"
        });
    }

    async generateTest(filePath: string): Promise<string> {
        const sourceFile = this.project.getSourceFile(filePath);
        if (!sourceFile) throw new Error(`File not found: ${filePath}`);

        const className = this.getClassName(sourceFile);
        const testPath = filePath.replace('.ts', '.test.ts');

        return `
import { ${className} } from './${className}';

describe('${className}', () => {
    let sut: ${className};

    beforeEach(() => {
        sut = new ${className}();
    });

    test('should be defined', () => {
        expect(sut).toBeDefined();
    });

    ${this.generateMethodTests(sourceFile)}
});`;
    }

    private getClassName(sourceFile: SourceFile): string {
        const classes = sourceFile.getClasses();
        if (classes.length === 0) throw new Error('No class found');
        return classes[0].getName() || '';
    }

    private generateMethodTests(sourceFile: SourceFile): string {
        const classes = sourceFile.getClasses();
        const methods = classes[0].getMethods();

        return methods.map(method => `
    describe('${method.getName()}', () => {
        test('should handle valid input', () => {
            // Arrange
            // Act
            // Assert
        });

        test('should handle invalid input', () => {
            // Arrange
            // Act
            // Assert
        });
    })`).join('\n');
    }
}