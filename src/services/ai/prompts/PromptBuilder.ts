export class PromptBuilder implements IPromptBuilder {
    constructor(
        private readonly templates: Map<string, PromptTemplate>,
        private readonly validator: IPromptValidator
    ) {}

    build(templateId: string, params: PromptParameters): Result<string> {
        const template = this.templates.get(templateId);
        if (!template) {
            return failure(new PromptError(`Template ${templateId} not found`));
        }

        const validationResult = this.validator.validate(template, params);
        if (!validationResult.success) {
            return validationResult;
        }

        return success(this.interpolate(template.template, params));
    }

    private interpolate(template: string, params: PromptParameters): string {
        return template.replace(/\${(\w+)}/g, (_, key) => params[key] || '');
    }
}