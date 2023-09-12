import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

DarkModeProvider.propTypes = {
  children: PropTypes.node,
};
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    // to use window setting prefernce of dark mode or not
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDarkMode"
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context)
    throw new Error(`
    DarkModeContext was used outside of 
    DarkModeProvider 
  `);

  return context;
}

export { DarkModeProvider, useDarkMode };
