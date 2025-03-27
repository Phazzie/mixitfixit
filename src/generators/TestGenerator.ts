import { SourceFile, MethodDeclaration } from 'ts-morph';
import { BaseGenerator } from './base/BaseGenerator';

export class TestGenerator extends BaseGenerator {
    async generate(filePath: string): Promise<void> {
        const sourceFile = this.getSourceFile(filePath);
        if (!sourceFile) throw new Error(`File not found: ${filePath}`);

        const testContent = await this.generateTestContent(sourceFile);
        const testPath = filePath.replace('.ts', '.test.ts');
        await this.saveFile(testPath, testContent);
    }

    private async generateTestContent(sourceFile: SourceFile): Promise<string> {
        const classes = this.getClasses(sourceFile);
        if (classes.length === 0) throw new Error('No class found');

        const className = classes[0].getName() || '';
        const methods = classes[0].getMethods();

        return `
import { ${className} } from './${className}';
import { Mock, vi } from 'vitest';

describe('${className}', () => {
    let sut: ${className};
    ${this.generateMocks(classes[0])}

    beforeEach(() => {
        ${this.generateMockSetup(classes[0])}
        sut = new ${className}(${this.generateConstructorParams(classes[0])});
    });

    ${this.generateMethodTests(methods)}
});`;
    }

    private generateMocks(classDecl: ClassDeclaration): string {
        const constructor = classDecl.getConstructors()[0];
        if (!constructor) return '';

        return constructor.getParameters()
            .map(param => `let mock${param.getName()}: Mock<${param.getType().getText()}>;`)
            .join('\n    ');
    }

    private generateMockSetup(classDecl: ClassDeclaration): string {
        const constructor = classDecl.getConstructors()[0];
        if (!constructor) return '';

        return constructor.getParameters()
            .map(param => `mock${param.getName()} = vi.fn();`)
            .join('\n        ');
    }

    private generateConstructorParams(classDecl: ClassDeclaration): string {
        const constructor = classDecl.getConstructors()[0];
        if (!constructor) return '';

        return constructor.getParameters()
            .map(param => `mock${param.getName()}`)
            .join(', ');
    }

    private generateMethodTests(methods: MethodDeclaration[]): string {
        return methods.map(method => {
            const methodName = method.getName();
            const params = method.getParameters();
            
            return `
    describe('${methodName}', () => {
        test('should handle successful execution', async () => {
            // Arrange
            ${this.generateArrangeSection(method)}

            // Act
            ${this.generateActSection(method)}

            // Assert
            ${this.generateAssertSection(method)}
        });

        test('should handle error scenarios', async () => {
            // Arrange
            ${this.generateErrorArrangeSection(method)}

            // Act & Assert
            await expect(async () => {
                ${this.generateActSection(method)}
            }).rejects.toThrow();
        });
    });`
        }).join('\n\n');
    }

    private generateArrangeSection(method: MethodDeclaration): string {
        const params = method.getParameters();
        return params.map(param => 
            `const ${param.getName()} = ${this.generateMockValue(param.getType().getText())};`
        ).join('\n            ');
    }

    private generateActSection(method: MethodDeclaration): string {
        const params = method.getParameters();
        const paramNames = params.map(p => p.getName()).join(', ');
        const isAsync = method.isAsync();
        return `${isAsync ? 'await ' : ''}sut.${method.getName()}(${paramNames});`;
    }

    private generateAssertSection(method: MethodDeclaration): string {
        return 'expect(true).toBe(true); // TODO: Add specific assertions';
    }

    private generateErrorArrangeSection(method: MethodDeclaration): string {
        return '// TODO: Add error scenario setup';
    }

    private generateMockValue(type: string): string {
        switch (type) {
            case 'string': return '"mock-string"';
            case 'number': return '42';
            case 'boolean': return 'true';
            case 'Promise<void>': return 'Promise.resolve()';
            default: return '{}';
        }
    }
}
