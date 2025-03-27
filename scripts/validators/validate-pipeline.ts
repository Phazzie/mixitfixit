import { readFileSync } from 'fs';
import { load } from 'js-yaml';

class PipelineValidator {
    async validate(): Promise<boolean> {
        const issues: string[] = [];
        
        try {
            const ciConfig = load(readFileSync('.github/workflows/ci.yml', 'utf8'));
            const codeQualityConfig = load(readFileSync('.github/workflows/code-quality.yml', 'utf8'));
            
            this.validateWorkflow(ciConfig, issues);
            this.validateWorkflow(codeQualityConfig, issues);
            
            if (issues.length > 0) {
                console.error("Pipeline Validation Issues:");
                issues.forEach(issue => console.error(`- ${issue}`));
                return false;
            }
            return true;
        } catch (error) {
            console.error("Pipeline validation failed:", error);
            return false;
        }
    }

    private validateWorkflow(config: any, issues: string[]) {
        if (!config.on) issues.push("Missing trigger configuration");
        if (!config.jobs) issues.push("No jobs defined");
        
        // Validate required jobs
        const requiredJobs = ['lint', 'test', 'build'];
        requiredJobs.forEach(job => {
            if (!config.jobs[job]) issues.push(`Missing required job: ${job}`);
        });
    }
}