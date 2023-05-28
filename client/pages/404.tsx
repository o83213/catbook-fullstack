import * as React from "react";
import styled from "styled-components";

const StyledError = styled.h2`
  display: flex;
  margin: 0;
  height: calc(100vh - 105px - 111px);
  justify-content: center;
  align-items: center;
`;

const Page = () => {
  return <StyledError>404 | Page not found...</StyledError>;
};

export default Page;
