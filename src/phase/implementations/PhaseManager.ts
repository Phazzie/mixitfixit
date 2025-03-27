import { IPhaseManager } from '../interfaces/IPhaseManager';

export enum Phase {
  ISSUE_PROPOSAL = 'ISSUE_PROPOSAL',
  STEEL_MANNING = 'STEEL_MANNING',
  DISCUSSION = 'DISCUSSION',
  SUMMARY = 'SUMMARY'
}

interface PhaseState {
  currentPhase: Phase;
  completedPhases: Set<Phase>;
  phaseData: Map<Phase, any>;
}

export class PhaseManager implements IPhaseManager {
  private state: PhaseState = {
    currentPhase: Phase.ISSUE_PROPOSAL,
    completedPhases: new Set(),
    phaseData: new Map()
  };

  private subscribers = new Set<(state: PhaseState) => void>();

  getCurrentPhase(): Phase {
    return this.state.currentPhase;
  }

  isPhaseComplete(phase: Phase): boolean {
    return this.state.completedPhases.has(phase);
  }

  completePhase(phase: Phase, data?: any): void {
    if (phase !== this.state.currentPhase) {
      throw new Error(`Cannot complete phase ${phase} when current phase is ${this.state.currentPhase}`);
    }

    this.state.completedPhases.add(phase);
    if (data) {
      this.state.phaseData.set(phase, data);
    }

    this.moveToNextPhase();
    this.notifySubscribers();
  }

  getPhaseData(phase: Phase): any {
    return this.state.phaseData.get(phase);
  }

  private moveToNextPhase(): void {
    const phases = Object.values(Phase);
    const currentIndex = phases.indexOf(this.state.currentPhase);
    if (currentIndex < phases.length - 1) {
      this.state.currentPhase = phases[currentIndex + 1];
    }
  }

  subscribe(callback: (state: PhaseState) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback({ ...this.state }));
  }
}