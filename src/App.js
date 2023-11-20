import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import "./App.css";

const App = () => {
  const [isCompeleteColor, setIsCompeleteColor] = useState(false);

  return (
    <div className="App">
      <h1>TODO LIST</h1>

      <div className="todo_wrapper">
        {/* add new todos */}
        <div className="todo_input">
          <div className="todo_input_item">
            <label>Title</label>
            <input type="text" placeholder="What's the task Title" />
          </div>
          <div className="todo_input_item">
            <label>Description</label>
            <input type="text" placeholder="What's the task Description" />
          </div>
          <div className="todo_input_item">
            <button type="button" className="primary_button">
              Add
            </button>
          </div>
        </div>

        {/* controller buttons */}
        <div className="button_area">
          <button
            className={`secondary_button ${
              isCompeleteColor === false && "active"
            }`}
            onClick={() => setIsCompeleteColor(false)}
          >
            To Do
          </button>
          <button
            className={`secondary_button ${
              isCompeleteColor === true && "active"
            }`}
            onClick={() => setIsCompeleteColor(true)}
          >
            Completed
          </button>
        </div>

        {/* all todos */}
        <div className="todo_lists">
          <div className="todo_list_item">
            <div>
              <h3>Task</h3>
              <p>Description</p>
            </div>

            <div className="icons">
              <MdDelete className="icon delete" />
              <FaCheck className="icon check" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
