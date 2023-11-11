import "./header.css";
import Moon from "../../assets/icon-moon.svg";
import Sun from "../../assets/icon-sun.svg";
import { useContext } from "react";
import { MyContext } from "../../App";

function Header() {
  const { day, setDay } = useContext(MyContext);

  return (
    <div className="header">
      <h1>TODO</h1>
      <div className="moon-sun" onClick={() => setDay(!day)}>
        {day ? (
          <img src={Moon} alt="moon" id="icon" />
        ) : (
          <img src={Sun} alt="sun" id="icon" />
        )}
      </div>
    </div>
  );
}

export default Header;
