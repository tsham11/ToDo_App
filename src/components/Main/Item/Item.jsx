import "./item.css";
import Cross from "../../../assets/icon-cross.svg";
import { useContext } from "react";
import { MyContext } from "../../../App";

function Item({ text, isChecked, onCheck, onDelete, provided, snapshot }) {
  const { day } = useContext(MyContext);

  const checkChange = () => {
    onCheck(text);
  };

  return (
    <div
      className={`item ${isChecked ? "checked" : ""} ${day ? "dk" : ""}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        opacity: snapshot.isDragging ? "0.8" : "1",
      }}
    >
      <div className={`content`}>
        <label htmlFor={text} className="container">
          <input
            type="checkbox"
            name={text}
            id={text}
            checked={isChecked}
            onChange={checkChange}
            className="item-inp"
          />
          {text}
          <span className="checkmark"></span>
        </label>
        <img
          src={Cross}
          alt="icon-cross"
          id="cross"
          onClick={() => onDelete(text)}
        />
      </div>
    </div>
  );
}

export default Item;
