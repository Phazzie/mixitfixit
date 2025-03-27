export class PermissionErrorDetector {
  detect(error: unknown): boolean {
    return (error as any)?.message?.includes('Permission denied') ?? false;
  }
}