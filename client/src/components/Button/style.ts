import styled from "styled-components";
export const BodySTY = styled.div<{ backgroundColor?: string }>`
  button {
    width: ${({ theme }) => `calc(${theme.screen.laptop} /3)`};
    color: white;

    font-weight: 500;
    border: transparent;
    border-radius: 4px;
    margin: 8px auto;
    padding: 6px;

    &:hover {
      cursor: pointer;
    }
  }
`;
