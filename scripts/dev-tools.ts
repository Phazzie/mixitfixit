#!/usr/bin/env node
import { execSync } from 'child_process';
import { program } from 'commander';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ErrorTracker } from './utils/error-tracker';

interface FileMovement {
    source: string;
    destination: string;
    status: 'pending' | 'completed' | 'failed';
    date?: string;
    reason: string;
}

class DevTools {
    private readonly movementsFile = path.join(process.cwd(), 'refactor', 'file-movements.md');
    private readonly errorTracker: ErrorTracker;

    constructor() {
        this.errorTracker = new ErrorTracker();
    }

    async init() {
        try {
            await this.errorTracker.init();
            await fs.mkdir(path.join(process.cwd(), 'refactor'), { recursive: true });
            await this.ensureMovementsFile();
        } catch (error) {
            console.error('Initialization failed:', error);
            process.exit(1);
        }
    }

    private async ensureMovementsFile() {
        try {
            await fs.access(this.movementsFile);
        } catch {
            const header = `# File Movement Tracker

## Status Legend
🔄 Pending | ✅ Completed | ❌ Failed

## Movements
`;
            await fs.writeFile(this.movementsFile, header);
        }
    }

    async trackMovement(source: string, destination: string, reason: string) {
        try {
            const content = await fs.readFile(this.movementsFile, 'utf-8');
            const entry = `
### ${new Date().toISOString().split('T')[0]}
- Source: \`${source}\`
- Destination: \`${destination}\`
- Status: 🔄 Pending
- Reason: ${reason}
`;
            await fs.writeFile(this.movementsFile, content + entry);
            console.log('✅ Movement tracked successfully');
        } catch (error) {
            console.error('Failed to track movement:', error);
            process.exit(1);
        }
    }

    async updateMovementStatus(source: string, status: FileMovement['status']) {
        try {
            const content = await fs.readFile(this.movementsFile, 'utf-8');
            const statusEmoji = {
                pending: '🔄',
                completed: '✅',
                failed: '❌'
            };
            
            const updated = content.replace(
                new RegExp(`(Source: \`${source}\`[\\s\\S]*?Status: )🔄( Pending)`),
                `$1${statusEmoji[status]}${status === 'pending' ? ' Pending' : ` ${status.charAt(0).toUpperCase() + status.slice(1)}`}`
            );
            
            await fs.writeFile(this.movementsFile, updated);
            console.log(`✅ Status updated to ${status}`);
        } catch (error) {
            console.error('Failed to update status:', error);
            process.exit(1);
        }
    }

    async analyzeScripts() {
        try {
            const scripts = await this.findScripts();
            const categories = this.categorizeScripts(scripts);
            await this.generateReport(categories);
            console.log('✅ Script analysis complete. Check refactor/script-analysis.md');
        } catch (error) {
            console.error('Script analysis failed:', error);
            process.exit(1);
        }
    }

    private async findScripts(): Promise<string[]> {
        try {
            return execSync('find scripts -type f -name "*.sh" -o -name "*.ts"')
                .toString()
                .split('\n')
                .filter(Boolean);
        } catch (error) {
            console.error('Failed to find scripts:', error);
            return [];
        }
    }

    private categorizeScripts(scripts: string[]): Record<string, string[]> {
        return {
            'Keep (Essential)': scripts.filter(s => 
                s.includes('dev-tools') || 
                s.includes('error-tracker')),
            'Consolidate': scripts.filter(s =>
                s.includes('track_typescript_errors') ||
                s.includes('error_message_validator')),
            'Archive': scripts.filter(s =>
                s.includes('show_simple') ||
                s.includes('show_structure'))
        };
    }

    private async generateReport(categories: Record<string, string[]>) {
        const report = `# Script Analysis Report
${Object.entries(categories)
    .map(([category, files]) => `
## ${category}
${files.map(f => `- \`${f}\``).join('\n')}
`).join('\n')}
`;
        await fs.writeFile(path.join(process.cwd(), 'refactor', 'script-analysis.md'), report);
    }

    async validate() {
        try {
            console.log('🧪 Running tests...');
            execSync('npm run test', { stdio: 'inherit' });
            
            console.log('\n📝 Analyzing scripts...');
            await this.analyzeScripts();
            
            console.log('\n✅ Validation complete');
        } catch (error) {
            console.error('Validation failed:', error);
            process.exit(1);
        }
    }
}

// Initialize tools
const tools = new DevTools();
tools.init().catch(console.error);

// CLI Commands
program
    .command('track-move <source> <destination>')
    .description('Track a file movement')
    .option('-r, --reason <reason>', 'Reason for moving the file')
    .action((source, destination, options) => {
        tools.trackMovement(source, destination, options.reason || 'Refactoring for better organization');
    });

program
    .command('update-status <source> <status>')
    .description('Update movement status (pending/completed/failed)')
    .action((source, status) => {
        tools.updateMovementStatus(source, status as FileMovement['status']);
    });

program
    .command('analyze-scripts')
    .description('Analyze and categorize scripts')
    .action(() => {
        tools.analyzeScripts();
    });

program
    .command('validate')
    .description('Run all validations')
    .action(() => {
        tools.validate();
    });

program.parse(process.argv);
