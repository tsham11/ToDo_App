import { useState, createContext, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [day, setDay] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("light");
  }, [day]);

  return (
    <MyContext.Provider value={{ day, setDay }}>{children}</MyContext.Provider>
  );
}

function App() {
  return (
    <>
      <MyProvider>
        <Header />
        <Main />
        <p className="drag">Drag and drop to reorder list</p>
      </MyProvider>
    </>
  );
}

export default App;
