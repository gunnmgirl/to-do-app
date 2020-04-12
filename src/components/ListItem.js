import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border-bottom: ${(props) => props.border};
  padding-top: 4px;
  padding-bottom: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
`;

const StyledButton = styled.button`
  border: 0;
  padding-right: 14px;
  margin-left: 6px;
  background-color: #ffffff;
`;

const Text = styled.span`
  text-decoration: ${(props) => props.decoration};
  color: #262626;
  font-size: 0.9rem;
  font-weight: 100;
`;

function ListItem(props) {
  const {
    icon,
    text,
    onTextClick = null,
    onIconClick = null,
    textDecoration = "none",
    boxBorder = "0.6px solid #d9d9d9",
  } = props;
  return (
    <Wrapper border={boxBorder}>
      <StyledButton onClick={onIconClick}>{icon}</StyledButton>
      <Text decoration={textDecoration} onClick={onTextClick}>
        {text}
      </Text>
    </Wrapper>
  );
}

export default ListItem;
