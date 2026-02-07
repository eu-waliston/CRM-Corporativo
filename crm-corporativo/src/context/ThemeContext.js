import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Verificar se há tema salvo no localStorage ou preferência do sistema
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('theme');
      if (stored) {
        return stored;
      }

      const userPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      return userPrefersDark ? 'light' : 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Aplicar tema ao documento
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Salvar no localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Alternar tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Definir tema explicitamente
  const setThemeMode = (mode) => {
    setTheme(mode);
  };

  const value = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme: setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
