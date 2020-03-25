import React, { useState } from "react";
import nanoid from "nanoid";
import styled from "styled-components";
import CheckCircle from "./CheckCircle";
import Circle from "./Circle";
import Plus from "./Plus";

const IconTextWrapper = styled.div`
  border-bottom: 0.5px solid #e6e6e6;
  padding-bottom: 10px;
  padding-top: 10px;
  display: flex;
  align-items: center;
`;

const InputBox = styled.input`
  border: 0;
`;

const Text = styled.span`
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
  font-family: "Roboto", sans-serif;
  color: #262626;
  font-size: 0.9rem;
  font-weight: 100;
`;

const StyledButton = styled.button`
  border: 0;
  padding-right: 14px;
  background-color: #ffffff;
`;

function handleOnSubmit(e, todos, setTodos, input, setInput) {
  e.preventDefault();
  const id = nanoid();
  input
    ? setTodos([...todos, { id, text: input, completed: false }])
    : setTodos([...todos]);
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
      <IconTextWrapper>
        <StyledButton>
          <Plus color="#bfbfbf" />
        </StyledButton>
        <form
          onSubmit={event =>
            handleOnSubmit(event, todos, setTodos, input, setInput)
          }
        >
          <InputBox
            placeholder="Add a task"
            onChange={event => setInput(event.target.value)}
            value={input}
          />
        </form>
      </IconTextWrapper>
      {todos.map(todo => (
        <IconTextWrapper>
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
          <Text completed={todo.completed}>{todo.text}</Text>
        </IconTextWrapper>
      ))}
    </div>
  );
}

export default App;
