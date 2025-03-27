import { program } from 'commander';
import { ErrorTracker } from './utils/error-tracker';
import * as fs from 'fs/promises';
import * as path from 'path';

const tracker = new ErrorTracker();

program
    .command('list')
    .description('List all active issues')
    .action(async () => {
        const content = await fs.readFile(
            path.join(process.cwd(), 'errors', 'active-issues.md'),
            'utf-8'
        );
        console.log(content);
    });

program
    .command('resolve <id>')
    .description('Mark an issue as resolved')
    .action(async (id) => {
        await tracker.markResolved(id);
        console.log(`✅ Marked issue ${id} as resolved`);
    });

program
    .command('archive')
    .description('Show resolved issues')
    .action(async () => {
        const content = await fs.readFile(
            path.join(process.cwd(), 'errors', 'resolved-issues.md'),
            'utf-8'
        );
        console.log(content);
    });

program.parse(process.argv);