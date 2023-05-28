import styled from "styled-components";

export const BodySTY = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  .menu-item {
    display: flex;
    padding: 10px;
    background: none;
    border: none;
    gap: 10px;
    align-items: center;
    border-radius: 10px;
    transition: all 0.3s;
    font-size: 16px;
    :hover {
      background-color: ${({ theme }) => theme.colors["B-Tints2"]};
    }
  }
`;
