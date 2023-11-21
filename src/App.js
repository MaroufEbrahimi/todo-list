import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import "./App.css";

const App = () => {
  const [isCompeleteColor, setIsCompeleteColor] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updataTodoArr = [...allTodos];
    updataTodoArr.push(newTodoItem);
    setAllTodos(updataTodoArr);

    console.log(updataTodoArr.title);
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>

      <div className="todo_wrapper">
        {/* add new todos */}
        <div className="todo_input">
          <div className="todo_input_item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task Title"
            />
          </div>
          <div className="todo_input_item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task Description"
            />
          </div>
          <div className="todo_input_item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primary_button"
            >
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
          {allTodos.map((todo, index) => (
            <div className="todo_list_item" key={index}>
              <div>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>

              <div className="icons">
                <MdDelete className="icon delete" />
                <FaCheck className="icon check" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
