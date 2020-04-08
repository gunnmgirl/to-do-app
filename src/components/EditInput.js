import React, { useState } from "react";
import styled from "styled-components";

const EditTitle = styled.input`
  background-color: transparent;
  border: 0;
  color: #ffffff;
  padding-left: 8px;
  font-size: 1rem;
`;

function EditTitleInput(props) {
  const { handleOnSubmit, defaultValue } = props;
  const [input, setInput] = useState(defaultValue);

  return (
    <form
      onSubmit={() => handleOnSubmit(input)}
      onBlur={() => handleOnSubmit(input)}
    >
      <EditTitle
        defaultValue={defaultValue}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}

export default EditTitleInput;
