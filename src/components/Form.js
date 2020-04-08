import React, { useState } from "react";
import styled from "styled-components";
import nanoid from "nanoid";

import Plus from "../Icons/Plus";
import unsplash from "./Unsplash";

const InputBox = styled.input`
  border: 0;
`;

const ListIconTextWrapper = styled.div`
  border-bottom: 0;
  padding-bottom: 10px;
  padding-top: 10px;
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  border: 0;
  padding-right: 14px;
  margin-left: 6px;
  background-color: #ffffff;
`;

function Form({ handleOnFormSubmit, placeholder = "" }) {
  const [input, setInput] = useState("");
  return (
    <form onSubmit={(event) => handleOnFormSubmit(event, input, setInput)}>
      <ListIconTextWrapper>
        <StyledButton>
          <Plus color="#3385ff" />
        </StyledButton>
        <InputBox
          placeholder={placeholder}
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
      </ListIconTextWrapper>
    </form>
  );
}

export default Form;
