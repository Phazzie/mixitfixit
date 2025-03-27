class ContentAnalyzer {
  analyzeResponse(response) {
    if (!response.response) {
      throw new GeminiError('Failed to generate response');
    }
    return response.response.text();
  }
}
