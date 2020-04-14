import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import App from "./components/App";
import darkTheme from "./themes/darkTheme";

const root = document.querySelector("#root");

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>,
  root
);
