export const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme-preference');
  
  if (savedTheme !== null) {
    return savedTheme === 'dark';
  }
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  
  return false;
};

export const saveTheme = (isDark: boolean): void => {
  localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
};

export const listenToSystemThemeChanges = (callback: (isDark: boolean) => void): (() => void) => {
  const savedTheme = localStorage.getItem('theme-preference');
  
  if (savedTheme !== null) {
    return () => {};
  }
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener('change', handler);
  
  return () => {
    mediaQuery.removeEventListener('change', handler);
  };
};
