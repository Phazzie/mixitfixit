export class ContentPolicyViolationDetector {
  detect(error: unknown): boolean {
    return (error as any)?.details?.[0]?.metadata?.includes('HarmBlockThreshold') ?? false;
  }
}