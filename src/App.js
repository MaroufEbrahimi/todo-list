import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import "./App.css";

const App = () => {
  const [isCompeleteColor, setIsCompeleteColor] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editTitle, setEditTitle] = useState(null);
  const [editDescription, setEditDescription] = useState(null);

  // update
  const updateTodo = (title, description, id, completed) => {
    const newTodo = allTodos.map((todo) =>
      todo.id === id ? { title, description, id, completed } : todo
    );
    setAllTodos(newTodo);
    setEditTitle("");
    setEditDescription("");
  };

  useEffect(() => {
    if (editTitle && editDescription) {
      setNewTitle(editTitle.title);
      setNewDescription(editTitle.description);
    } else {
      setNewTitle("");
      setNewDescription("");
    }
  }, [setNewTitle, setNewDescription, editTitle, editDescription]);

  // added new todo
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    if (!editTitle && !editDescription) {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setAllTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      setNewTitle("");
      setNewDescription("");
    } else {
      updateTodo(newTitle, newDescription, editTitle.id, editTitle.completed);
    }
  };

  // delete todo
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  // compelete todos
  const handleComplete = (index) => {
    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let sec = now.getSeconds();

    let completedOn =
      date +
      "-" +
      month +
      "-" +
      year +
      " at " +
      hour +
      ":" +
      minute +
      ":" +
      sec;

    let fillteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(fillteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  // delete completed todo
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  // edit the text
  const handleEditTodo = ({ id }) => {
    const findTodo = allTodos.find((todo) => todo.id === id);
    setEditTitle(findTodo);
    setEditDescription(findTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

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
              required
            />
          </div>
          <div className="todo_input_item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task Description"
              required
            />
          </div>
          <div className="todo_input_item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primary_button"
            >
              {editTitle ? "OK" : "Add"}
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
          {isCompeleteColor === false &&
            allTodos.map((todo, index) => {
              return (
                <div className="todo_list_item" key={index}>
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                  </div>

                  <div className="icons">
                    <MdDelete
                      className="icon delete"
                      title="Delete"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <CiEdit
                      className="icon check"
                      title="Edit"
                      onClick={() => handleEditTodo(todo)}
                    />
                    <FaCheck
                      className="icon check"
                      title="Compelete"
                      onClick={() => handleComplete(index)}
                    />
                  </div>
                </div>
              );
            })}

          {isCompeleteColor === true &&
            completedTodos.map((todo, index) => {
              return (
                <div className="todo_list_item" key={index}>
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <p>
                      <small>Compelete on: {todo.completedOn}</small>
                    </p>
                  </div>

                  <div className="icons">
                    <MdDelete
                      className="icon delete"
                      title="Delete"
                      onClick={() => handleDeleteCompletedTodo(index)}
                    />
                    {/* <FaCheck
                      className="icon check"
                      title="Compelete"
                      onClick={() => handleComplete(index)}
                    /> */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
