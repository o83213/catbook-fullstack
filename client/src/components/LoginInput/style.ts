import styled from "styled-components";
export const BodySTY = styled.div<{ className?: string }>`
  .input-box {
    display: flex;
    width: ${({ theme }) => `calc(${theme.screen.laptop} /3)`};
    border-radius: 4px;
    padding: 6px;
    margin: 8px 0;
    .label {
      display: flex;
      width: 150px;
      justify-content: flex-start;
      align-items: center;
      gap: 5px;
      border-right: 0.1rem solid black;
    }

    input {
      border: none;
      width: 100%;
      padding: 0 6px;

      &:focus {
        outline: none;
      }
    }
  }
`;
