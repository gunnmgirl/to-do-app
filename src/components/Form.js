import React, { useState } from "react";
import styled from "styled-components";

import Plus from "../icons/Plus";

const InputBox = styled.input`
  border: 0;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.backgroundPrimary};
  ::placeholder {
    color: ${(props) => props.theme.primary};
  }
`;

const ListIconTextWrapper = styled.div`
  border-bottom: 0;
  padding-bottom: 0.6rem;
  padding-top: 0.6rem;
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  border: 0;
  padding-right: 0.9rem;
  margin-left: 0.4rem;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

function Form({ handleOnFormSubmit, placeholder = "", theme }) {
  const [input, setInput] = useState("");
  return (
    <form onSubmit={(event) => handleOnFormSubmit(event, input, setInput)}>
      <ListIconTextWrapper>
        <StyledButton>
          <Plus color={theme.primary} />
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
