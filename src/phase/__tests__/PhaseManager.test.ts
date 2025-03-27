import { PhaseManager, Phase } from '../implementations/PhaseManager';

describe('PhaseManager', () => {
  let phaseManager: PhaseManager;

  beforeEach(() => {
    phaseManager = new PhaseManager();
  });

  it('should initialize with ISSUE_PROPOSAL phase', () => {
    expect(phaseManager.getCurrentPhase()).toBe(Phase.ISSUE_PROPOSAL);
  });

  it('should complete phases in order', () => {
    phaseManager.completePhase(Phase.ISSUE_PROPOSAL, { agreed: true });
    expect(phaseManager.getCurrentPhase()).toBe(Phase.STEEL_MANNING);
    expect(phaseManager.isPhaseComplete(Phase.ISSUE_PROPOSAL)).toBe(true);
  });

  it('should store phase data', () => {
    const phaseData = { agreed: true };
    phaseManager.completePhase(Phase.ISSUE_PROPOSAL, phaseData);
    expect(phaseManager.getPhaseData(Phase.ISSUE_PROPOSAL)).toEqual(phaseData);
  });

  it('should notify subscribers of phase changes', () => {
    const mockCallback = jest.fn();
    phaseManager.subscribe(mockCallback);
    phaseManager.completePhase(Phase.ISSUE_PROPOSAL);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('should throw error when completing wrong phase', () => {
    expect(() => {
      phaseManager.completePhase(Phase.DISCUSSION);
    }).toThrow();
  });
});