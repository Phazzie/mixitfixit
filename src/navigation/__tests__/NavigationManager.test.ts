import { NavigationManager } from '../NavigationManager';

describe('NavigationManager', () => {
  let navigationManager: NavigationManager;

  beforeEach(() => {
    navigationManager = new NavigationManager();
  });

  it('should initialize with root route', () => {
    expect(navigationManager.getCurrentRoute()).toBe('/');
  });

  it('should navigate to new route', () => {
    navigationManager.navigate('/test');
    expect(navigationManager.getCurrentRoute()).toBe('/test');
  });

  it('should store navigation params', () => {
    navigationManager.navigate('/test', { id: '123' });
    expect(navigationManager.getParams()).toEqual({ id: '123' });
  });

  it('should support going back', () => {
    navigationManager.navigate('/first');
    navigationManager.navigate('/second');
    expect(navigationManager.goBack()).toBe(true);
    expect(navigationManager.getCurrentRoute()).toBe('/first');
  });

  it('should notify subscribers of changes', () => {
    const mockCallback = jest.fn();
    navigationManager.subscribe(mockCallback);
    navigationManager.navigate('/test');
    expect(mockCallback).toHaveBeenCalled();
  });
});