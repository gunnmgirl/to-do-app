import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import nanoid from "nanoid";

import CheckCircle from "./CheckCircle";
import Circle from "./Circle";
import Plus from "./Plus";
import Form from "./Form";
import List from "./List";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
  body {
    margin: 0;
    padding: 0;
  }
`;

const TaskIconTextWrapper = styled.div`
  border-bottom: 0.5px solid #e6e6e6;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgb(255, 255, 255);
`;

const ListIconTextWrapper = styled(TaskIconTextWrapper)`
  border-bottom: 0;
`;

const InputBox = styled.input`
  border: 0;
`;

const Text = styled.span`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  font-family: "Roboto", sans-serif;
  color: #262626;
  font-size: 0.9rem;
  font-weight: 100;
`;

const StyledButton = styled.button`
  border: 0;
  padding-right: 14px;
  margin-left: 6px;
  background-color: rgb(255, 255, 255);
`;

const Sidebar = styled.div`
  width: 20%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const Tasks = styled.div`
  width: 80%;
  padding-top: 10px;
`;

const ListTitle = styled.span`
  font-family: "Roboto", sans-serif;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 500;
  padding-left: 8px;
`;

const Header = styled.div`
  height: 100px;

  background: url(${(props) => props.theme});
  background-size: cover;
  background-position: center;
`;

const EditTitleInput = styled.input`
  background-color: transparent;
  border: 0;
  color: rgb(255, 255, 255);
  padding-left: 8px;
  font-size: 1rem;
`;

const ImageTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.1);
`;

function App() {
  const [input, setInput] = useState("");
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("Lists")) || []
  );
  const [activeList, setActiveList] = useState(null);
  const [editedInput, setEditedInput] = useState("");

  var date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  const today = dd + "/" + mm + "/" + yyyy;

  function handleComplete(task) {
    const newLists = lists.map((list) => {
      const newTasks = list.tasks.map((todo) => {
        if (todo.id === task.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return { ...list, tasks: newTasks };
    });
    setLists(newLists);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    lists.map((list) =>
      list.id === activeList
        ? list.tasks.push({ text: input, id: nanoid(), completed: false })
        : list.tasks
    );
    localStorage.setItem("Lists", JSON.stringify(lists));
    setInput("");
  }

  function handleEditTitle(e) {
    e.preventDefault();
    const newList = lists.map((list) =>
      list.id === activeList
        ? { ...list, name: editedInput, editMode: false }
        : { ...list }
    );
    setLists(newList);
  }

  function changeEditMode() {
    const newList = lists.map((list) =>
      list.id === activeList
        ? { ...list, editMode: !list.editMode }
        : { ...list }
    );
    setLists(newList);
  }

  function setActiveListandEditedInput(list) {
    setActiveList(list.id);
    setEditedInput(list.name);
  }

  useEffect(() => {
    function handleDeleteList() {
      const newList = lists.filter((list) => {
        return list.id !== activeList;
      });
      newList[newList.length - 1]
        ? setActiveList(newList[newList.length - 1].id)
        : setActiveList(null);
      setLists(newList);
    }

    const handleDel = (event) => {
      if (event.keyCode === 46) {
        handleDeleteList();
      }
    };
    window.addEventListener("keydown", handleDel);

    return () => {
      window.removeEventListener("keydown", handleDel);
    };
  }, [activeList, lists]);

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Sidebar>
          {lists.map((list) => (
            <ListIconTextWrapper>
              <StyledButton>
                <List color="#3385ff" />
              </StyledButton>
              <Text
                onClick={() => setActiveListandEditedInput(list)}
                key={list.id}
              >
                {list.name}
              </Text>
            </ListIconTextWrapper>
          ))}
          <Form lists={lists} setLists={setLists} placeholder="New list" />
        </Sidebar>
        <Tasks>
          {lists.map((list) => {
            return list.id === activeList ? (
              <>
                <Header theme={list.theme}>
                  <ImageTitleWrapper>
                    {list.editMode ? (
                      <form
                        onSubmit={(e) => handleEditTitle(e)}
                        onBlur={() => changeEditMode()}
                      >
                        <EditTitleInput
                          defaultValue={list.name}
                          onChange={(e) => setEditedInput(e.target.value)}
                          autoFocus
                        />
                      </form>
                    ) : (
                      <ListTitle onClick={() => changeEditMode()}>
                        {list.name}
                      </ListTitle>
                    )}
                    <ListTitle>{today}</ListTitle>
                  </ImageTitleWrapper>
                </Header>
                {list.tasks.map((task) => (
                  <TaskIconTextWrapper>
                    <StyledButton onClick={() => handleComplete(task)}>
                      {task.completed ? (
                        <CheckCircle color="#3385ff" />
                      ) : (
                        <Circle color="#8c8c8c" />
                      )}
                    </StyledButton>
                    <Text completed={task.completed}>{task.text}</Text>
                  </TaskIconTextWrapper>
                ))}
              </>
            ) : null;
          })}

          {activeList ? (
            <>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <TaskIconTextWrapper>
                  <StyledButton>
                    <Plus color="#3385ff" />
                  </StyledButton>
                  <InputBox
                    placeholder="Add a task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </TaskIconTextWrapper>
              </form>
            </>
          ) : null}
        </Tasks>
      </MainContainer>
    </>
  );
}

export default App;
