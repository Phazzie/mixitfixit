import { MockLogger } from '../../testing/mocks/MockLogger';
import { MockPhaseValidator } from '../../testing/mocks/MockPhaseValidator';
import { Phase } from '../../types';
import { PhaseTransitionError } from './errors';
import { PhaseManager } from './PhaseManager';
describe('PhaseManager', () => {
  let manager: PhaseManager;  let validator: MockPhaseValidator;
  let logger: MockLogger;
  beforeEach(() => {    validator = new MockPhaseValidator();
    logger = new MockLogger();    manager = new PhaseManager(validator, logger);
  });
  test('should initialize with correct phase', () => {    expect(manager.getCurrentPhase()).toBe(Phase.INITIAL);
  });
  test('should transition when valid', async () => {    validator.setValidTransition(true);
    await manager.transitionTo(Phase.DISCUSSION);    expect(manager.getCurrentPhase()).toBe(Phase.DISCUSSION);
  });
  test('should throw on invalid transition', async () => {    validator.setValidTransition(false);
    await expect(      manager.transitionTo(Phase.RESOLUTION)
    ).rejects.toThrow(PhaseTransitionError);  });
  test('should store and retrieve phase data', async () => {
    const testData = { key: 'value' };    validator.setValidTransition(true);
        await manager.transitionTo(Phase.DISCUSSION, testData);
    const retrievedData = manager.getPhaseData(Phase.DISCUSSION);    
    expect(retrievedData).toEqual(testData);
  });
});






















