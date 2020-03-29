import React, { useState } from "react";
import styled from "styled-components";
import nanoid from "nanoid";
import Plus from "./Plus";

const InputBox = styled.input`
  border: 0;
`;

const ListIconTextWrapper = styled.div`
  border-bottom: none;
  padding-bottom: 10px;
  padding-top: 10px;
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  border: 0;
  padding-right: 14px;
  background-color: #ffffff;
`;

function handleOnSubmit(e, lists, setLists, input, setInput) {
  e.preventDefault();
  const id = nanoid();
  input
    ? setLists([...lists, { id, name: input, tasks: [] }])
    : setLists([...lists]);
  setInput("");
}

function Form({ lists, setLists, placeholder }) {
  const [input, setInput] = useState("");
  return (
    <form
      onSubmit={event =>
        handleOnSubmit(event, lists, setLists, input, setInput)
      }
    >
      <ListIconTextWrapper>
        <StyledButton>
          <Plus color="#3385ff" />
        </StyledButton>
        <InputBox
          placeholder={placeholder}
          onChange={event => setInput(event.target.value)}
          value={input}
        />
      </ListIconTextWrapper>
    </form>
  );
}

export default Form;
