"use client";

import { useEffect } from "react";

type ThemeHandlerProps = {
  children: React.ReactNode;
};

const ThemeHandler = ({ children }: ThemeHandlerProps) => {
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  };

  const applyTheme = () => {
    const cookieMode = getCookie("mode");
    const isDark = cookieMode === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  };

  useEffect(() => {
    // Aplica el tema cuando carga
    applyTheme();

    // Observador para detectar cambios en las cookies
    const interval = setInterval(() => {
      applyTheme();
    }, 1000); // cada segundo (puede bajarse si querés)

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
};

export default ThemeHandler;
