import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaSquareSteam } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import moment from "jalali-moment";
import "./App.css";

const App = () => {
  const [isCompeleteColor, setIsCompeleteColor] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editTitle, setEditTitle] = useState(null);
  const [editDescription, setEditDescription] = useState(null);
  const [error, setError] = useState(false);

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
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTitle.length == 0 || newDescription.length == 0) {
      setError(true);
    }
    if (newTitle && newDescription) {
      if (!editTitle && !editDescription) {
        setAllTodos([
          ...allTodos,
          { id: uuidv4(), title: newTitle, description: newDescription },
        ]);
        localStorage.setItem("todolist", JSON.stringify([...allTodos]));
        setNewTitle("");
        setNewDescription("");
      } else {
        updateTodo(newTitle, newDescription, editTitle.id, editTitle.completed);
      }
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
    let persianMonth = [
      "حمل",
      "ثور",
      "جوزا",
      "سرطان",
      "اسد",
      "سنبله",
      "میزان",
      "عقرب",
      "قوس",
      "جدی",
      "دلو",
      "حوت",
    ];

    let currentDate = new Date();
    let newDateShamsi = moment(currentDate);
    let year = newDateShamsi.jYear();
    let month = persianMonth[newDateShamsi.jMonth()];
    let day = newDateShamsi.jDate();
    let hour = newDateShamsi.hours();
    let minute = newDateShamsi.minute();
    let sec = newDateShamsi.seconds();
    let pmam = "ق.ظ";

    // cover 24 hours to 12 hours
    if (hour > 12) {
      hour = hour % 12;
      pmam = "ب‌.ظ";
    }

    let completedOn =
      day +
      "-" +
      month +
      "-" +
      year +
      " ساعت " +
      hour +
      ":" +
      minute +
      ":" +
      sec +
      " " +
      pmam;

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
    const editTotos = [...allTodos];
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
      <h1>
        <p>لیست یاداشت ها</p>
      </h1>

      <div className="todo_wrapper">
        {/* add new todos */}
        <form className="todo_input" onSubmit={handleAddTodo}>
          <div className="todo_input_item">
            <label>عنوان</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="عنوان مربوطه ..."
              required
            />
            {error && newTitle.length <= 0 ? <small>عنوان خالی است</small> : ""}
          </div>
          <div className="todo_input_item">
            <label>توضیحات</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="توضیحات در باره ..."
              required
            />
            {error && newDescription.length <= 0 ? (
              <small>قسمت توضیحات خالی است</small>
            ) : (
              ""
            )}
          </div>
          <div className="todo_input_item">
            <button
              type="submit"
              onClick={handleAddTodo}
              className="primary_button"
            >
              {editTitle ? "تائید" : "اضافه کردن"}
            </button>
          </div>
        </form>

        {/* controller buttons */}
        <div className="button_area">
          <button
            className={`secondary_button ${
              isCompeleteColor === false && "active"
            }`}
            onClick={() => setIsCompeleteColor(false)}
          >
            یاداشت ها
          </button>
          <button
            className={`secondary_button ${
              isCompeleteColor === true && "active"
            }`}
            onClick={() => setIsCompeleteColor(true)}
          >
            تکمیل شده ها
          </button>
        </div>

        {/* all todos */}
        <div className="todo_lists">
          {isCompeleteColor === false &&
            allTodos.map((todo, index) => {
              return (
                <div className="todo_list_item" key={todo.id}>
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                  </div>

                  <div className="icons">
                    <MdDelete
                      className="icon delete"
                      title="پاک کردن"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <CiEdit
                      className="icon check"
                      title="ویرایش"
                      onClick={() => handleEditTodo(todo)}
                    />
                    <FaCheck
                      className="icon check"
                      title="تکمیل کردن"
                      onClick={() => handleComplete(index)}
                    />
                  </div>
                </div>
              );
            })}
          {/* Compeleted todos */}
          {isCompeleteColor === true &&
            completedTodos.map((todo, index) => {
              return (
                <div className="todo_list_item" key={index}>
                  <div className="todo_list_complete">
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <p className="complete_on">
                      <small>تکمیل شده در: {todo.completedOn}</small>
                    </p>
                  </div>

                  <div className="icons">
                    <MdDelete
                      className="icon delete"
                      title="پاک کردن"
                      onClick={() => handleDeleteCompletedTodo(index)}
                    />
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
