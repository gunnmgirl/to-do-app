import React, { useState, useEffect } from "react";
import nanoid from "nanoid";
import styled from "styled-components";

import unsplash from "./Unsplash";
import CheckCircleIcon from "../icons/CheckCircle";
import CircleIcon from "../icons/Circle";
import Form from "./Form";
import ListIcon from "../icons/List";
import GlobalStyle from "../StyledComponents/GlobalStyle";
import utils from "../utils";
import EditInputText from "./EditInputText";
import Header from "./Header";
import hooks from "../hooks";
import ListItem from "./ListItem";

const HeaderText = styled.span`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  padding-left: 8px;
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
    if (!inputValue) return null;
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

  function handleDeleteList() {
    const newList = lists.filter((list) => {
      return list.id !== activeList;
    });
    newList[newList.length - 1]
      ? setActiveList(newList[newList.length - 1].id)
      : setActiveList(null);
    setLists(newList);
  }

  hooks.useKeyPress("Delete", () => handleDeleteList());

  useEffect(() => {
    utils.localStorage.set(storageName, lists);
  }, [lists]);

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Sidebar>
          {lists.map((list) => (
            <ListItem
              icon={<ListIcon color="#3385ff" />}
              text={list.name}
              onTextClick={() => setActiveListandEditedInput(list)}
            />
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
                {list.tasks.map((task) =>
                  task.completed ? (
                    <ListItem
                      icon={<CheckCircleIcon color="#3385ff" />}
                      text={task.text}
                      onIconClick={() => handleComplete(task)}
                      textDecoration="line-through"
                    />
                  ) : (
                    <ListItem
                      icon={<CircleIcon color="#8c8c8c" />}
                      text={task.text}
                      onIconClick={() => handleComplete(task)}
                    />
                  )
                )}
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
