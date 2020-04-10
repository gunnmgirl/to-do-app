import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 100px;
  background: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const HeaderText = styled.span`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  padding-left: 8px;
`;

function Header(props) {
  const { primary, image, secondary = "" } = props;

  return (
    <StyledHeader image={image}>
      <HeaderContent>
        {primary()}
        <HeaderText>{secondary}</HeaderText>
      </HeaderContent>
    </StyledHeader>
  );
}

export default Header;
