import React from "react";
import styled from "styled-components";
import { Popover } from "@malcodeman/react-popover";

const Wrapper = styled.div`
  border-bottom: ${(props) => props.border};
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  margin-bottom: 0.6rem;
  margin-top: 0.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const StyledButton = styled.button`
  border: 0;
  padding-right: 0.9rem;
  margin-left: 0.4rem;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const Text = styled.span`
  text-decoration: ${(props) => props.decoration};
  color: ${(props) => props.theme.primary};
  font-size: 0.9rem;
  font-weight: 100;
`;

const StyledPopover = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 0 1rem;
`;

const Menu = styled.ul`
  padding: 0.25rem 0.25rem;
  margin: 0;
`;

const MenuItem = styled.li`
  list-style: none;
  padding: 0.25rem 1rem;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

function ListItem(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    listId,
    myDayId,
    deleteList,
    icon,
    text,
    onTextClick = null,
    onIconClick = null,
    textDecoration = "none",
    boxBorder = "0.03rem solid rgba(191, 191, 191, 0.5)",
  } = props;

  function content() {
    return (
      <StyledPopover>
        <Menu>
          <MenuItem
            onClick={() => {
              deleteList(listId);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </StyledPopover>
    );
  }

  return (
    <Popover
      isOpen={isOpen}
      content={content}
      onClickOutside={() => setIsOpen(false)}
    >
      <Wrapper
        border={boxBorder}
        onContextMenu={(event) => {
          if (listId === myDayId) return null;
          event.preventDefault();
          setIsOpen(!isOpen);
        }}
        onClick={() => setIsOpen(false)}
      >
        <StyledButton onClick={onIconClick}>{icon}</StyledButton>
        <Text decoration={textDecoration} onClick={onTextClick}>
          {text}
        </Text>
      </Wrapper>
    </Popover>
  );
}

export default ListItem;
