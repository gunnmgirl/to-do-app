import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
  }
  `;

export default GlobalStyle;
