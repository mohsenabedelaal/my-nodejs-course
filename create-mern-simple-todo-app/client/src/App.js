import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import { createTodos, deleteTodo, readTodos, updateTodo } from "./functions";

function App() {
  const [todo, setTodo] = useState({ title: "", content: "" });
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearField);
    return () => {
      window.removeEventListener("keydown", clearField);
    };
  }, []);
  useEffect(() => {
    const currentTodo =
      currentId != 0
        ? todos.find((todo) => todo._id === currentId)
        : { title: "", content: "" };
    setTodo(currentTodo);
  }, [currentId]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result);
    };
    fetchData();
  }, [currentId]);
  const clear = () => {
    setCurrentId(0);
    setTodo({ title: "", content: "" });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      const result = await createTodos(todo);
      setTodos([...todos, result]);
    } else {
      await updateTodo(currentId, todo);

      // const newTodoList = todos.map((currnetTodo) => {
      //   if (currnetTodo._id === currentId) {
      //     currnetTodo = todo;
      //   }
      //   return currnetTodo;
      // });

      // setTodos([...newTodoList]);
    }
    clear();
  };
  const removeTodo = async (id) => {
    await deleteTodo(id);
    const todosCopy = [...todos];
    todosCopy.filter((todo) => todo._id !== id);
    setTodos(todosCopy);
  };
  return (
    <div className="container">
      <div className="row">
        <pre>{JSON.stringify(todo)}</pre>
        <form className="col s12" onSubmit={submitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input
                value={todo.title}
                id="icon_prefix"
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                type="text"
                className="validate"
              />
              <label htmlFor="icon_prefix">Title Name</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input
                value={todo.content}
                id="description"
                type="tel"
                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
                className="validate"
              />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="waves-effect waves-light btn">Submit</button>
          </div>
        </form>
        {!todos ? (
          <Preloader />
        ) : todos.length > 0 ? (
          <ul className="collection">
            {todos.map((todo) => (
              <li
                onClick={() => setCurrentId(todo._id)}
                className="collection-item"
                key={todo._id}
              >
                <div>
                  <h5>{todo.title}</h5>
                  <p>
                    {todo.content}
                    <a
                      href="#!"
                      className="secondary-content"
                      onClick={() => removeTodo(todo._id)}
                    >
                      <i className="material-icons">delete</i>
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>Nothing todo</div>
        )}
      </div>
    </div>
  );
}

export default App;
