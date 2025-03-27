import { useState, useEffect } from 'react';
import { Phase, PhaseManager } from '../implementations/PhaseManager';

const phaseManager = new PhaseManager();

export function usePhaseManager() {
  const [currentPhase, setCurrentPhase] = useState(phaseManager.getCurrentPhase());
  const [phaseData, setPhaseData] = useState<Map<Phase, any>>(new Map());

  useEffect(() => {
    return phaseManager.subscribe((state) => {
      setCurrentPhase(state.currentPhase);
      setPhaseData(state.phaseData);
    });
  }, []);

  return {
    currentPhase,
    isPhaseComplete: phaseManager.isPhaseComplete.bind(phaseManager),
    completePhase: phaseManager.completePhase.bind(phaseManager),
    getPhaseData: phaseManager.getPhaseData.bind(phaseManager)
  };
}