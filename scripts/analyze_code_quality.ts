import { exec } from 'child_process';
import { ESLint } from 'eslint';
import * as fs from 'fs/promises';
import { glob } from 'glob';
import { promisify } from 'util';
import { calculateComplexity } from './analyzers/complexity-analyzer';
import { analyzeTestCoverage } from './analyzers/coverage-analyzer';
import { checkDependencies } from './analyzers/dependency-analyzer';
import { createReport } from './reporters/html-reporter';

const execAsync = promisify(exec);

interface FileMetrics {
    path: string;
    lintIssues: any[];
    complexity: number;
    testCoverage: number;
    lineCount: number;
    functionCount: number;
    maxFunctionLength: number;
    dependencies: string[];
}

interface AnalysisResult {
    metrics: FileMetrics[];
    summary: {
        totalFiles: number;
        totalIssues: number;
        averageComplexity: number;
        averageCoverage: number;
        healthScore: number;
    };
}

export class CodeQualityAnalyzer {
    private readonly eslint: ESLint;
    
    constructor() {
        this.eslint = new ESLint({
            useEslintrc: true,
            fix: true
        });
    }

    async analyze(patterns: string[]): Promise<AnalysisResult> {
        console.log('🔍 Starting code quality analysis...');
        
        const files = await glob(patterns);
        const metrics: FileMetrics[] = [];
        
        for (const file of files) {
            console.log(`Analyzing ${file}...`);
            
            try {
                const content = await fs.readFile(file, 'utf-8');
                const metric = await this.analyzeFile(file, content);
                metrics.push(metric);
            } catch (error) {
                console.error(`Error analyzing ${file}:`, error);
            }
        }

        const summary = this.calculateSummary(metrics);
        await this.generateReports(metrics, summary);
        
        return { metrics, summary };
    }

    private async analyzeFile(filePath: string, content: string): Promise<FileMetrics> {
        const [lintResults, complexity, coverage] = await Promise.all([
            this.eslint.lintText(content, { filePath }),
            calculateComplexity(content),
            analyzeTestCoverage(filePath),
        ]);

        const dependencies = await checkDependencies(filePath);
        
        return {
            path: filePath,
            lintIssues: lintResults[0]?.messages || [],
            complexity,
            testCoverage: coverage,
            lineCount: content.split('\n').length,
            functionCount: this.countFunctions(content),
            maxFunctionLength: this.getMaxFunctionLength(content),
            dependencies
        };
    }

    private countFunctions(content: string): number {
        const functionMatches = content.match(/function\s+\w+\s*\(|=>|class\s+\w+/g);
        return functionMatches ? functionMatches.length : 0;
    }

    private getMaxFunctionLength(content: string): number {
        const functionBlocks = content.match(/function\s+\w+\s*\([^{]*{[^}]*}/g) || [];
        return Math.max(...functionBlocks.map(block => 
            block.split('\n').length
        ), 0);
    }

    private calculateSummary(metrics: FileMetrics[]): AnalysisResult['summary'] {
        const totalFiles = metrics.length;
        const totalIssues = metrics.reduce((sum, m) => sum + m.lintIssues.length, 0);
        const averageComplexity = metrics.reduce((sum, m) => sum + m.complexity, 0) / totalFiles;
        const averageCoverage = metrics.reduce((sum, m) => sum + m.testCoverage, 0) / totalFiles;
        
        const healthScore = this.calculateHealthScore({
            issuesPerFile: totalIssues / totalFiles,
            complexity: averageComplexity,
            coverage: averageCoverage
        });

        return {
            totalFiles,
            totalIssues,
            averageComplexity,
            averageCoverage,
            healthScore
        };
    }

    private calculateHealthScore(metrics: {
        issuesPerFile: number;
        complexity: number;
        coverage: number;
    }): number {
        const issuesScore = Math.max(0, 100 - (metrics.issuesPerFile * 10));
        const complexityScore = Math.max(0, 100 - (metrics.complexity * 5));
        const coverageScore = metrics.coverage;

        return (issuesScore + complexityScore + coverageScore) / 3;
    }

    private async generateReports(
        metrics: FileMetrics[],
        summary: AnalysisResult['summary']
    ): Promise<void> {
        await createReport(metrics, summary);
        
        console.log('\n📊 Analysis Summary:');
        console.log(`Total Files: ${summary.totalFiles}`);
        console.log(`Total Issues: ${summary.totalIssues}`);
        console.log(`Average Complexity: ${summary.averageComplexity.toFixed(2)}`);
        console.log(`Average Coverage: ${summary.averageCoverage.toFixed(2)}%`);
        console.log(`Health Score: ${summary.healthScore.toFixed(2)}/100`);
        
        if (summary.healthScore < 70) {
            console.log('\n⚠️ Recommendations:');
            this.provideRecommendations(metrics);
        }
    }

    private provideRecommendations(metrics: FileMetrics[]): void {
        const issues = metrics
            .filter(m => m.maxFunctionLength > 20)
            .map(m => `${m.path}: Function exceeds 20 lines`);
            
        const complexFiles = metrics
            .filter(m => m.complexity > 10)
            .map(m => `${m.path}: High complexity (${m.complexity})`);
            
        const lowCoverage = metrics
            .filter(m => m.testCoverage < 80)
            .map(m => `${m.path}: Low test coverage (${m.testCoverage}%)`);

        [...issues, ...complexFiles, ...lowCoverage]
            .forEach(recommendation => console.log(`- ${recommendation}`));
    }
}

// Usage example
if (require.main === module) {
    const analyzer = new CodeQualityAnalyzer();
    analyzer.analyze([
        'src/**/*.{ts,tsx,js,jsx}',
        '!src/**/*.test.{ts,tsx,js,jsx}',
        '!src/**/*.stories.{ts,tsx,js,jsx}'
    ]).catch(console.error);
}
