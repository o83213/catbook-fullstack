import styled from "styled-components";

export const BodySTY = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
  padding: 0.5rem;
  box-shadow: 0px 2.5px 5px ${({ theme }) => theme.primaryPalette.BoxShadow};
  .friend-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .option-list {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    button {
      border: none;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      border-radius: 50%;
      font-size: ${({ theme }) => theme.fontSize["18"]};
      transition: all 0.3s;
      &:hover {
        background-color: ${({ theme }) => theme.colors["B-Tints3"]};
      }
    }
  }
`;
