import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  /* 10px / 16px = 0.625 = 62.5% */
  /* Percentage of user's browser font-size setting */
  /* font-size: 62.5%; */
  font-size: 16px;
  /* overflow-x: hidden; */
  /* Does NOT work on Safari */

}

html, body {
  font-family: "Noto Sans",'Noto Sans TC', sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.primaryPalette.Text};
  line-height: 1;
  /* Only works if there is nothing absolutely positioned in relation to body */
  /* overflow-x: hidden; */
}
body{
    button{
        cursor: pointer;
    }
}
`;
