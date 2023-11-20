import React from "react";
import './App.css'

const App = () => {
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
          <button>Todo</button>
          <button>Completed</button>
        </div>

        {/* all todos */}
        <div className="todo_lists">
          <div className="todo_list_item">
            <h3>Task</h3>
            <p>Description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
