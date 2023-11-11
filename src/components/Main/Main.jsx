import "./main.css";
import Item from "./Item/Item";
import Circle from "../../assets/icon-circle.svg";
import Crc from "../../assets/icon-crc.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MyContext } from "../../App";

function Main() {
  const { day } = useContext(MyContext);
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.classList.toggle("day");
    }
  }, [day]);

  const arr = [
    { text: "Complete online JavaScript course", isChecked: false },
    { text: "Jog around the park 3x", isChecked: false },
    { text: "10 minutes meditation", isChecked: false },
    { text: "Read for 1 hour", isChecked: false },
    { text: "Pick up groceries", isChecked: false },
    { text: "Complete Todo App on Frontend Mentor", isChecked: false },
  ];

  const [array, setArray] = useState(arr);
  const [filter, setFilter] = useState("all");
  const [newTodo, setNewTodo] = useState("");

  const filteredItems = array.filter((el) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !el.isChecked;
    } else if (filter === "completed") {
      return el.isChecked;
    }
  });

  const addNew = () => {
    if (newTodo.trim() === "") return;
    const newArray = [...array, { text: newTodo, isChecked: false }];
    setArray(newArray);
    setNewTodo("");
  };

  const checkedItem = (checkText) => {
    const newArray = array.map((el) => {
      if (el.text === checkText) {
        return { ...el, isChecked: !el.isChecked };
      }
      return el;
    });
    setArray(newArray);
  };

  const deleteItem = (delItem) => {
    const newArray = array.filter((el) => el.text !== delItem);
    setArray(newArray);
  };

  const clearCompleted = () => {
    const newArray = array.filter((el) => !el.isChecked);
    setArray(newArray);
  };

  return (
    <div className="main" ref={mainRef}>
      <div className="box">
        {day ? (
          <img src={Circle} alt="circle-icon" id="circle" />
        ) : (
          <img src={Crc} alt="circle-icon" id="circle" />
        )}
        <input
          type="text"
          placeholder="Create a new todo…"
          name="box"
          value={newTodo} // link input field value to the state
          onChange={(e) => setNewTodo(e.target.value)} // Update the state as the user types
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNew();
            }
          }}
        />
      </div>
      <DragDropContext
        onDragEnd={(params) => {
          const srcI = params.source.index;
          const desI = params.destination.index;
          const ar = [...array];
          const temp = ar[srcI];
          ar[srcI] = ar[desI];
          ar[desI] = temp;
          setArray(ar);
        }}
      >
        <div className="list">
          <Droppable droppableId="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filteredItems.map((el, i) => (
                  <Draggable
                    key={el.text}
                    draggableId={"draggable-" + el.text}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <Item
                        text={el.text}
                        key={el.text}
                        isChecked={el.isChecked}
                        onCheck={checkedItem}
                        onDelete={deleteItem}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* {filteredItems.map((el) => {
              return (
                <Item
                  text={el.text}
                  key={el.text}
                  isChecked={el.isChecked}
                  onCheck={checkedItem}
                  onDelete={deleteItem}
                />
              );
            })} */}

          <div className="count">
            <p>
              {filteredItems.filter((el) => !el.isChecked).length} items left
            </p>
            <p id="clear" onClick={clearCompleted}>
              Clear Completed
            </p>
          </div>
        </div>
      </DragDropContext>
      <div className="total">
        <p
          className={`ttl ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </p>
        <p
          className={`ttl ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </p>
        <p
          className={`ttl ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </p>
      </div>
    </div>
  );
}

export default Main;
