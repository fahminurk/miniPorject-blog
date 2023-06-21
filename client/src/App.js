import { createContext, useEffect, useState } from "react";
import Loading from "./components/loading";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";
import "./css/app.css";

export const ThemeContext = createContext(null);

function App() {
  const [isloading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => {
      const newTheme = curr == "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    const themeNow = localStorage.getItem("theme");
    if (themeNow) {
      setTheme(themeNow);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isloading]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        {isloading ? <Loading /> : <Routes>{routes.map((val) => val)}</Routes>}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
