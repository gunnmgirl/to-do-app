import React, { useState } from "react";
import nanoid from "nanoid";
import styled from "styled-components";
import CheckCircle from "./CheckCircle";
import Circle from "./Circle";

const Task = styled.div`
  border-bottom: 0.5px solid #e6e6e6;
  padding-bottom: 10px;
  padding-top: 10px;
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  font-family: "Segoe";
  color: #0d0d0d;
  font-size: 1.1rem;
`;

const StyledButton = styled.button`
  border: none;
  padding-right: 14px;
  background-color: #ffffff;
`;

function handleOnSubmit(e, todos, setTodos, input, setInput) {
  e.preventDefault();
  const id = nanoid();
  setTodos([...todos, { id, text: input, completed: false }]);
  setInput("");
}

function handleOnClick(id, setTodos, todos) {
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
        <input
          placeholder="Add a task"
          onChange={event => setInput(event.target.value)}
          value={input}
        />
      </form>
      {todos.map(todo => (
        <Task>
          <StyledButton>
            {todo.completed ? (
              <CheckCircle
                color="#3385ff"
                onClick={() => handleOnClick(todo.id, setTodos, todos)}
              />
            ) : (
              <Circle
                color="#3385ff"
                onClick={() => handleOnClick(todo.id, setTodos, todos)}
              />
            )}
          </StyledButton>
          <Text>{todo.text}</Text>
        </Task>
      ))}
    </div>
  );
}

export default App;
