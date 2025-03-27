import * as parser from '@babel/parser';
import { readFileSync } from 'fs';
import { glob } from 'glob';
import * as shell from 'shelljs';
import * as ts from 'typescript';

interface FileAnalysis {
    path: string;
    score: number;
    metrics: {
        srp: boolean;
        complexity: number;
        testCoverage: number;
        documentation: number;
        errorHandling: boolean;
        lintErrors: number;
        gitBlame: {
            numberOfAuthors: number;
            lastModified: Date;
            changeFrequency: number;
        };
    };
    recommendations: string[];
}

class EnhancedCodeAnalyzer {
    private async analyzeFile(filePath: string): Promise<FileAnalysis> {
        const extension = filePath.split('.').pop()?.toLowerCase();
        const content = readFileSync(filePath, 'utf8');

        const baseMetrics = {
            path: filePath,
            score: 0,
            metrics: {
                srp: true,
                complexity: 0,
                testCoverage: 0,
                documentation: 0,
                errorHandling: false,
                lintErrors: 0,
                gitBlame: await this.getGitMetrics(filePath)
            },
            recommendations: []
        };

        switch (extension) {
            case 'ts':
            case 'tsx':
                return this.analyzeTypeScript(content, baseMetrics);
            case 'js':
            case 'jsx':
                return this.analyzeJavaScript(content, baseMetrics);
            case 'py':
                return this.analyzePython(content, baseMetrics);
            case 'sh':
                return this.analyzeShellScript(content, baseMetrics);
            default:
                return this.analyzeGenericFile(content, baseMetrics);
        }
    }

    private async getGitMetrics(filePath: string) {
        const blame = shell.exec(`git blame ${filePath}`, { silent: true });
        const log = shell.exec(`git log --format="%ad" -- ${filePath}`, { silent: true });

        return {
            numberOfAuthors: new Set(blame.stdout.split('\n').map(line => line.split('(')[1]?.split(' ')[0])).size,
            lastModified: new Date(log.stdout.split('\n')[0]),
            changeFrequency: log.stdout.split('\n').length
        };
    }

    private analyzeShellScript(content: string, baseMetrics: FileAnalysis): FileAnalysis {
        const metrics = { ...baseMetrics };
        
        // Check for error handling
        metrics.metrics.errorHandling = content.includes('set -e') || 
                                      content.includes('|| exit') ||
                                      content.includes('if [');

        // Check for documentation
        metrics.metrics.documentation = (content.match(/#[^!]/g) || []).length / content.split('\n').length;

        // Check complexity
        metrics.metrics.complexity = (content.match(/if|case|while|for/g) || []).length;

        if (!metrics.metrics.errorHandling) {
            metrics.recommendations.push('Add error handling with set -e or explicit error checks');
        }

        if (metrics.metrics.documentation < 0.1) {
            metrics.recommendations.push('Add more documentation to explain script functionality');
        }

        return metrics;
    }

    private calculateMigrationScore(metrics: FileAnalysis): number {
        let score = 100;

        // Deduct points for complexity
        score -= Math.max(0, metrics.metrics.complexity - 5) * 5;

        // Deduct for lack of documentation
        if (metrics.metrics.documentation < 0.1) score -= 20;

        // Deduct for lack of error handling
        if (!metrics.metrics.errorHandling) score -= 15;

        // Git metrics impact
        if (metrics.metrics.gitBlame.changeFrequency > 10) score -= 10;
        if (metrics.metrics.gitBlame.numberOfAuthors > 3) score -= 5;

        return Math.max(0, Math.min(100, score));
    }

    async analyzeProject(): Promise<void> {
        const patterns = [
            'src/**/*.{ts,tsx,js,jsx,py,sh}',
            'scripts/**/*.{sh,ts,js,py}',
            'config/**/*.{json,yaml,yml}'
        ];

        const files = await glob(patterns);
        const results: FileAnalysis[] = [];

        for (const file of files) {
            try {
                const metrics = await this.analyzeFile(file);
                metrics.score = this.calculateMigrationScore(metrics);
                results.push(metrics);
            } catch (error) {
                console.error(`Error analyzing ${file}:`, error);
            }
        }

        // Generate migration report
        console.log('\n🚀 Code Migration Analysis Report');
        console.log('================================');

        // High-quality files (candidates for migration)
        const migrationCandidates = results
            .filter(r => r.score >= 75)
            .sort((a, b) => b.score - a.score);

        console.log('\n✨ Recommended for Migration:');
        migrationCandidates.forEach(file => {
            console.log(`\n${file.path} (Score: ${file.score.toFixed(1)})`);
            console.log(`├── Error Handling: ${file.metrics.errorHandling ? '✅' : '❌'}`);
            console.log(`├── Documentation: ${(file.metrics.documentation * 100).toFixed(1)}%`);
            console.log(`├── Complexity: ${file.metrics.complexity}`);
            console.log(`├── Last Modified: ${file.metrics.gitBlame.lastModified.toLocaleDateString()}`);
            if (file.recommendations.length > 0) {
                console.log('└── Recommendations:');
                file.recommendations.forEach(rec => console.log(`    └── ${rec}`));
            }
        });

        // Generate automation suggestions
        console.log('\n🤖 Automation Opportunities:');
        this.generateAutomationSuggestions(results);
    }

    private generateAutomationSuggestions(results: FileAnalysis[]): void {
        const shellScripts = results.filter(r => r.path.endsWith('.sh'));
        const configFiles = results.filter(r => r.path.match(/\.(json|yaml|yml)$/));

        console.log('\n1. Script Improvements:');
        shellScripts.forEach(script => {
            console.log(`\n${script.path}:`);
            if (!script.metrics.errorHandling) {
                console.log('   - Add error handling (set -e)');
                console.log('   - Add parameter validation');
            }
            if (script.metrics.complexity > 5) {
                console.log('   - Consider breaking into smaller functions');
            }
        });

        console.log('\n2. Configuration Management:');
        if (configFiles.length > 0) {
            console.log('   - Consider centralizing configuration');
            console.log('   - Add validation for config files');
        }
    }

    private analyzeTypeScript(content: string, baseMetrics: FileAnalysis): FileAnalysis {
        const metrics = { ...baseMetrics };
        const sourceFile = ts.createSourceFile(
            'temp.ts',
            content,
            ts.ScriptTarget.Latest,
            true
        );

        // Check SRP - count classes
        let classCount = 0;
        sourceFile.forEachChild(node => {
            if (ts.isClassDeclaration(node)) {
                classCount++;
            }
        });
        metrics.metrics.srp = classCount <= 1;

        // Calculate complexity
        metrics.metrics.complexity = this.calculateComplexity(sourceFile);

        // Check error handling
        metrics.metrics.errorHandling = content.includes('try') && content.includes('catch');

        // Calculate documentation score
        metrics.metrics.documentation = 
            (content.match(/\/\*\*[\s\S]*?\*\//g) || []).length / content.split('\n').length;

        if (!metrics.metrics.errorHandling) {
            metrics.recommendations.push('Add error handling with try-catch blocks');
        }

        if (metrics.metrics.documentation < 0.1) {
            metrics.recommendations.push('Add JSDoc documentation to improve maintainability');
        }

        return metrics;
    }

    private analyzeJavaScript(content: string, baseMetrics: FileAnalysis): FileAnalysis {
        // Similar to TypeScript analysis but using babel parser
        const metrics = { ...baseMetrics };
        try {
            const ast = parser.parse(content, {
                sourceType: 'module',
                plugins: ['jsx']
            });

            metrics.metrics.complexity = this.calculateJSComplexity(ast);
            metrics.metrics.errorHandling = content.includes('try') && content.includes('catch');
            metrics.metrics.documentation = 
                (content.match(/\/\*\*[\s\S]*?\*\//g) || []).length / content.split('\n').length;

            return metrics;
        } catch (error) {
            console.error('Error parsing JavaScript:', error);
            return baseMetrics;
        }
    }

    private analyzePython(content: string, baseMetrics: FileAnalysis): FileAnalysis {
        const metrics = { ...baseMetrics };
        
        // Basic Python analysis
        metrics.metrics.errorHandling = content.includes('try:') && content.includes('except');
        metrics.metrics.documentation = 
            (content.match(/"""\s*[\s\S]*?\s*"""/g) || []).length / content.split('\n').length;
        metrics.metrics.complexity = (content.match(/if|elif|for|while|def class/g) || []).length;

        return metrics;
    }

    private analyzeGenericFile(content: string, baseMetrics: FileAnalysis): FileAnalysis {
        const metrics = { ...baseMetrics };
        
        // Basic analysis for unknown file types
        metrics.metrics.complexity = content.split('\n').length / 10; // Simple complexity metric
        metrics.metrics.documentation = 
            (content.match(/\/\/|#|\/\*|\*\/|"""/g) || []).length / content.split('\n').length;

        return metrics;
    }

    private calculateComplexity(sourceFile: ts.SourceFile): number {
        let complexity = 0;
        
        function visit(node: ts.Node) {
            switch (node.kind) {
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.CaseClause:
                case ts.SyntaxKind.CatchClause:
                    complexity++;
                    break;
            }
            ts.forEachChild(node, visit);
        }
        
        visit(sourceFile);
        return complexity;
    }

    private calculateJSComplexity(ast: any): number {
        let complexity = 0;
        // Simple complexity calculation for JavaScript
        const content = ast.program.body.toString();
        complexity += (content.match(/if|while|for|switch|catch/g) || []).length;
        return complexity;
    }
}

// Run the analyzer
const analyzer = new EnhancedCodeAnalyzer();
analyzer.analyzeProject().catch(console.error);
