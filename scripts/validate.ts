import { Command } from 'commander';
import { StructureValidator } from './validators/structure-validator';
import chalk from 'chalk';

const program = new Command();

program
    .name('validate')
    .description('Code validation tools')
    .version('1.0.0');

program.command('structure')
    .description('Validate code structure')
    .option('-f, --fix', 'Attempt to automatically fix issues')
    .option('-p, --path <path>', 'Path to validate', 'src')
    .action(async (options) => {
        console.log(chalk.blue('Validating code structure...'));
        const validator = new StructureValidator();
        const success = await validator.validateAndPrint();
        
        if (!success && options.fix) {
            console.log(chalk.yellow('\nAttempting to fix issues...'));
            // Add auto-fix logic here
        }
    });

program.parse();