import React, { useState } from "react";
import nanoid from "nanoid";

function handleOnSubmit(e, todos, setTodos, input, setInput) {
  e.preventDefault();
  const id = nanoid();
  setTodos([...todos, { id, text: input, completed: false }]);
  setInput("");
}

function handleOnChange(id, setTodos, todos) {
  setTodos(
    todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  return (
    <div>
      <form
        onSubmit={event =>
          handleOnSubmit(event, todos, setTodos, input, setInput)
        }
      >
        <input onChange={event => setInput(event.target.value)} value={input} />
      </form>
      {todos.map(todo => (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleOnChange(todo.id, setTodos, todos)}
          />
          {todo.text}
        </div>
      ))}
    </div>
  );
}

export default App;
