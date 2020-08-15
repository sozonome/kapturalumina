import React, { useState, useEffect } from "react";

export const ThemeContext = React.createContext({
  darkMode: false,
  changeMode: () => {},
});

export const ThemeProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mode = localStorage.darkMode;
    if (mode && JSON.parse(mode) === true) {
      setDarkMode(true);
      localStorage.darkMode = true;
      document.body.classList.toggle("dark");
    } else {
      setDarkMode(false);
      localStorage.darkMode = false;
    }
  }, []);

  const changeMode = () => {
    setDarkMode(!darkMode);
    localStorage.darkMode = !darkMode;
    document.body.classList.toggle("dark");
  };

  return (
    <ThemeContext.Provider value={{ darkMode, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
