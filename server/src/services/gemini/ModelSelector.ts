class ModelSelector implements IModelSelector {
  constructor(private readonly config: ModelConfig) {}

  select(client: GoogleGenerativeAI): GenerativeModel {
    return client.getGenerativeModel({
      model: this.config.modelName,
      safetySettings: this.config.safetySettings,
      generationConfig: this.config.generationConfig
    });
  }
}
