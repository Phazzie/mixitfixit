export class TextSanitizer {
  sanitize(text: string): string {
    return text.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
  }
}