import { format } from 'date-fns';
import * as fs from 'fs/promises';
import * as path from 'path';

interface ErrorItem {
    id: string;
    file: string;
    message: string;
    type: 'lint' | 'complexity' | 'coverage' | 'function-length';
    details?: any;
    created: string;
    resolved?: string;
    priority: 'high' | 'medium' | 'low';
}

export class ErrorTracker {
    private readonly trackingFile = path.join(process.cwd(), 'errors', 'active-issues.md');
    private readonly archiveFile = path.join(process.cwd(), 'errors', 'resolved-issues.md');

    async init() {
        await fs.mkdir(path.join(process.cwd(), 'errors'), { recursive: true });
        await this.ensureFiles();
    }

    private async ensureFiles() {
        for (const file of [this.trackingFile, this.archiveFile]) {
            try {
                await fs.access(file);
            } catch {
                const header = '# Code Issues Tracker\n\n## Active Issues\n\n';
                await fs.writeFile(file, header);
            }
        }
    }

    async addIssue(issue: Omit<ErrorItem, 'id' | 'created'>) {
        const id = this.generateId();
        const newIssue: ErrorItem = {
            ...issue,
            id,
            created: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        };

        const content = await fs.readFile(this.trackingFile, 'utf-8');
        const newEntry = this.formatIssue(newIssue);
        await fs.writeFile(this.trackingFile, content + newEntry);
    }

    private formatIssue(issue: ErrorItem): string {
        const priorityEmoji = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
        };

        return `
### ${issue.id} - ${priorityEmoji[issue.priority]} ${issue.file}
- [ ] ${issue.message}
- Type: \`${issue.type}\`
- Created: ${issue.created}
${issue.details ? `- Details: ${JSON.stringify(issue.details, null, 2)}` : ''}

`;
    }

    private generateId(): string {
        return `ISSUE-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`;
    }

    async markResolved(id: string) {
        const content = await fs.readFile(this.trackingFile, 'utf-8');
        const archive = await fs.readFile(this.archiveFile, 'utf-8');

        const regex = new RegExp(`(### ${id}.+?(?=### |$))`, 'gs');
        const match = content.match(regex);

        if (match) {
            // Remove checkbox and add resolution date
            const resolved = match[0].replace('- [ ]', '- [x]') +
                `- Resolved: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}\n`;

            // Remove from active issues
            const newContent = content.replace(regex, '');
            await fs.writeFile(this.trackingFile, newContent);

            // Add to archive
            await fs.writeFile(this.archiveFile, archive + resolved);
        }
    }
}
