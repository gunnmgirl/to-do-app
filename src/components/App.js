import React, { useState, useEffect } from "react";
import nanoid from "nanoid";
import styled from "styled-components";

import unsplash from "./Unsplash";
import CheckCircleIcon from "../Icons/CheckCircle";
import CircleIcon from "../Icons/Circle";
import Form from "./Form";
import ListIcon from "../Icons/List";
import GlobalStyle from "../StyledComponents/GlobalStyle";
import utils from "../utils";
import EditInputText from "./EditInputText";
import Header from "./Header";

const HeaderText = styled.span`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  padding-left: 8px;
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
  background-color: #ffffff;
`;

const ListIconTextWrapper = styled(TaskIconTextWrapper)`
  border-bottom: 0;
`;

const Text = styled.span`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: #262626;
  font-size: 0.9rem;
  font-weight: 100;
`;

const StyledButton = styled.button`
  border: 0;
  padding-right: 14px;
  margin-left: 6px;
  background-color: #ffffff;
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

function App() {
  const storageName = "Lists";
  const [lists, setLists] = useState(utils.localStorage.get(storageName, []));
  const [activeList, setActiveList] = useState(null);
  const [editedInput, setEditedInput] = useState("");
  const [editMode, setEditMode] = useState(false);

  const date = new Date();
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  const year = date.getFullYear();
  const today = `${day}/${month}/${year}`;

  async function handleOnFormSubmit(e, inputValue, setInputValue) {
    e.preventDefault();
    const response = await unsplash.get("/photos/random", {
      params: {
        query: "color wallpapers",
      },
    });
    const id = nanoid();
    inputValue
      ? setLists([
          ...lists,
          {
            id,
            name: inputValue,
            image: response.data.urls.regular,
            tasks: [],
          },
        ])
      : setLists([...lists]);
    setInputValue("");
    setEditMode(false);
  }

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

  function handleOnSubmit(e, inputValue, setInputValue) {
    e.preventDefault();
    lists.map((list) =>
      list.id === activeList
        ? list.tasks.push({ text: inputValue, id: nanoid(), completed: false })
        : list.tasks
    );
    utils.localStorage.set(storageName, lists);
    setLists([...lists]);
    setInputValue("");
  }

  function handleEditTitle(value) {
    const newList = lists.map((list) =>
      list.id === activeList ? { ...list, name: value } : { ...list }
    );
    setLists(newList);
    setEditMode(false);
  }

  function setActiveListandEditedInput(list) {
    setActiveList(list.id);
    setEditedInput(list.name);
  }

  function renderPrimary(name) {
    return (
      <EditInputText handleOnSubmit={handleEditTitle} defaultValue={name} />
    );
  }

  function renderTitle(name) {
    return (
      <HeaderText onClick={() => setEditMode(!editMode)}>{name}</HeaderText>
    );
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
    utils.localStorage.set(storageName, lists);
  }, [lists]);
  console.log(editMode);
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Sidebar>
          {lists.map((list) => (
            <ListIconTextWrapper>
              <StyledButton>
                <ListIcon color="#3385ff" />
              </StyledButton>
              <Text
                onClick={() => setActiveListandEditedInput(list)}
                key={list.id}
              >
                {list.name}
              </Text>
            </ListIconTextWrapper>
          ))}
          <Form
            handleOnFormSubmit={handleOnFormSubmit}
            placeholder="New list"
          />
        </Sidebar>
        <Tasks>
          {lists.map((list) => {
            return list.id === activeList ? (
              <>
                {/*<Header
                  primary={() => renderPrimary(list.name)}
                  image={list.image}
                  secondary={today}
                />*/}

                {editMode ? (
                  <Header
                    primary={() => renderPrimary(list.name)}
                    image={list.image}
                    secondary={today}
                  />
                ) : (
                  <Header
                    primary={() => renderTitle(list.name)}
                    image={list.image}
                    secondary={today}
                  />
                )}
                {list.tasks.map((task) => (
                  <TaskIconTextWrapper>
                    <StyledButton onClick={() => handleComplete(task)}>
                      {task.completed ? (
                        <CheckCircleIcon color="#3385ff" />
                      ) : (
                        <CircleIcon color="#8c8c8c" />
                      )}
                    </StyledButton>
                    <Text completed={task.completed}>{task.text}</Text>
                  </TaskIconTextWrapper>
                ))}
              </>
            ) : null;
          })}
          {activeList ? (
            <Form
              handleOnFormSubmit={handleOnSubmit}
              placeholder="Add a task"
            />
          ) : null}
        </Tasks>
      </MainContainer>
    </>
  );
}

export default App;
