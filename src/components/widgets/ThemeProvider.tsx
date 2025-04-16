'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mode = document.cookie
      .split('; ')
      .find(row => row.startsWith('mode='))
      ?.split('=')[1];

    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Marcar como cargado una vez que el tema ha sido procesado
    setIsLoaded(true);
  }, []);

  // No renderizar hasta que el tema se haya cargado
  if (!isLoaded) {
    return null; // o un loading spinner si prefieres
  }

  return <>{children}</>;
}
