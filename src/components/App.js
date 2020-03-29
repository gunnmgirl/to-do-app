import React, { useState, useEffect } from "react";
import styled from "styled-components";
import nanoid from "nanoid";

import CheckCircle from "./CheckCircle";
import Circle from "./Circle";
import Plus from "./Plus";
import Form from "./Form";
import List from "./List";

const ListIconTextWrapper = styled.div`
  border-bottom: none;
  padding-bottom: 10px;
  padding-top: 10px;
  display: flex;
  align-items: center;
`;

const TaskIconTextWrapper = styled.div`
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

const Sidebar = styled.div`
  width: 20%;
  height: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tasks = styled.div`
  width: 70%;
`;

const ListTitle = styled.span`
  font-family: "Roboto", sans-serif;
  color: #3e69e4;
  font-size: 1rem;
  font-weight: 100;
  padding-left: 8px;
`;

function App() {
  const [activeList, setActiveList] = useState(null);
  const [input, setInput] = useState("");
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("Lists")) || []
  );

  function handleComplete(task) {
    const newLists = lists.map(list => {
      const newTasks = list.tasks.map(todo => {
        if (todo.id === task.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return { ...list, tasks: newTasks };
    });
    setLists(newLists);
  }

  function handleOnSubmit(e, input, setInput, lists, activeList) {
    e.preventDefault();
    lists.map(list =>
      list.id === activeList
        ? list.tasks.push({ text: input, id: nanoid(), completed: false })
        : list.tasks
    );
    localStorage.setItem("Lists", JSON.stringify(lists));
    setInput("");
  }

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <MainContainer>
      <Sidebar>
        {lists.map(list => (
          <ListIconTextWrapper>
            <StyledButton>
              <List color="#3385ff" />
            </StyledButton>
            <Text onClick={() => setActiveList(list.id)}>{list.name}</Text>
          </ListIconTextWrapper>
        ))}
        <Form lists={lists} setLists={setLists} placeholder="New list" />
      </Sidebar>
      <Tasks>
        {lists.map(list =>
          list.id === activeList ? (
            <>
              <ListTitle>{list.name}</ListTitle>
              {list.tasks.map(task => (
                <TaskIconTextWrapper>
                  <StyledButton onClick={() => handleComplete(task)}>
                    {task.completed ? <CheckCircle /> : <Circle />}
                  </StyledButton>
                  <Text>{task.text}</Text>
                </TaskIconTextWrapper>
              ))}
            </>
          ) : null
        )}

        {activeList ? (
          <>
            <form
              onSubmit={e =>
                handleOnSubmit(e, input, setInput, lists, activeList)
              }
            >
              <TaskIconTextWrapper>
                <StyledButton>
                  <Plus color="#3385ff" />
                </StyledButton>
                <InputBox
                  placeholder="Add a task"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
              </TaskIconTextWrapper>
            </form>
          </>
        ) : null}
      </Tasks>
    </MainContainer>
  );
}

export default App;
