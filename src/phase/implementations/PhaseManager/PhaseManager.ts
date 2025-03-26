import { Phase, IPhaseManager } from './types';
export class PhaseManager implements IPhaseManager {  private readonly phases: Phase[] = ['statement', 'resolution', 'summary'];
  private currentPhaseIndex: number = 0;
  getCurrentPhase(): Phase {    return this.phases[this.currentPhaseIndex];
  }
  moveToNextPhase(): void {    if (this.canMoveToNextPhase()) {
      this.currentPhaseIndex++;    }
  }
  canMoveToNextPhase(): boolean {    return this.currentPhaseIndex < this.phases.length - 1;
  }
}










