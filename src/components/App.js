import React, { useState, useEffect } from "react";
import nanoid from "nanoid";
import styled, { ThemeProvider } from "styled-components";

import getRandomImage from "../api/unsplash";
import themes from "../themes";
import CheckCircleIcon from "../icons/CheckCircle";
import CircleIcon from "../icons/Circle";
import Form from "./Form";
import ListIcon from "../icons/List";
import GlobalStyle from "../style/GlobalStyle";
import utils from "../utils";
import EditInputText from "./EditInputText";
import Header from "./Header";
import hooks from "../hooks";
import ListItem from "./ListItem";
import MyDayImage from "../images/MyDayImage.png";

const HeaderText = styled.span`
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  padding-left: 0.5rem;
`;

const Lists = styled.div`
  @media (min-width: 576px) {
    min-height: 100vh;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  @media (min-width: 576px) {
    grid-template-columns: 1fr 4fr;
  }
`;

const Tasks = styled.div`
  padding-top: 0.6rem;
`;

const ListIconWrapper = styled(ListIcon)`
  color: ${(props) => props.theme.primary};
`;

const CheckCircleIconWrapper = styled(CheckCircleIcon)`
  color: ${(props) => props.theme.primary};
`;

const CircleIconWrapper = styled(CircleIcon)`
  color: ${(props) => props.theme.primary};
`;

function App() {
  const storageName = "lists";
  const dark = hooks.usePreferredTheme();
  const theme = dark ? themes.dark : themes.light;
  const INITIAL_VALUE = {
    id: nanoid(),
    name: "My Day",
    image: MyDayImage,
    tasks: [],
  };
  const [lists, setLists] = useState(
    utils.localStorage.get(storageName, [INITIAL_VALUE])
  );
  const initialActiveList =
    utils.localStorage.get(storageName, INITIAL_VALUE.id)[0].id ||
    utils.localStorage.get(storageName, INITIAL_VALUE.id);

  const [activeList, setActiveList] = useState(initialActiveList);
  const [editMode, setEditMode] = useState(false);

  const date = new Date();
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  const year = date.getFullYear();
  const today = `${day}/${month}/${year}`;

  async function handleOnFormSubmit(e, inputValue, setInputValue) {
    e.preventDefault();
    const response = await getRandomImage();
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
    setActiveList(id);
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

  function renderPrimary(name) {
    return (
      <EditInputText handleOnSubmit={handleEditTitle} defaultValue={name} />
    );
  }

  function renderTitle(name) {
    return (
      <HeaderText
        onClick={() => {
          if (name === "My Day") setEditMode(false);
          else {
            setEditMode(!editMode);
          }
        }}
      >
        {name}
      </HeaderText>
    );
  }

  function handleDeleteList() {
    if (activeList === lists[0].id) return null;
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
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Lists>
          {lists.map((list) => (
            <ListItem
              key={list.id}
              icon={<ListIconWrapper />}
              text={list.name}
              onTextClick={() => setActiveList(list.id)}
              boxBorder="0"
            />
          ))}
          <Form
            handleOnFormSubmit={handleOnFormSubmit}
            placeholder="New list"
          />
        </Lists>
        <Tasks>
          {lists.map((list) => {
            return list.id === activeList ? (
              <div key={list.id}>
                {editMode ? (
                  <Header
                    key={list.id}
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
                      key={task.id}
                      icon={<CheckCircleIconWrapper />}
                      text={task.text}
                      onIconClick={() => handleComplete(task)}
                      textDecoration="line-through"
                    />
                  ) : (
                    <ListItem
                      key={task.id}
                      icon={<CircleIconWrapper />}
                      text={task.text}
                      onIconClick={() => handleComplete(task)}
                    />
                  )
                )}
              </div>
            ) : null;
          })}
          {activeList ? (
            <Form
              handleOnFormSubmit={handleOnSubmit}
              placeholder="Add a task"
            />
          ) : null}
        </Tasks>
      </Container>
    </ThemeProvider>
  );
}

export default App;
