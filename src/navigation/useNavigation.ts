import { useState, useEffect } from 'react';
import { NavigationManager } from './NavigationManager';

const navigationManager = new NavigationManager();

export function useNavigation() {
  const [currentRoute, setCurrentRoute] = useState(navigationManager.getCurrentRoute());
  const [params, setParams] = useState(navigationManager.getParams());

  useEffect(() => {
    return navigationManager.subscribe((state) => {
      setCurrentRoute(state.currentRoute);
      setParams(state.params);
    });
  }, []);

  return {
    currentRoute,
    params,
    navigate: navigationManager.navigate.bind(navigationManager),
    goBack: navigationManager.goBack.bind(navigationManager)
  };
}