import styled from "styled-components";

export const BodySTY = styled.div`
  width: 360px;
  flex: 1;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow: scroll;
  padding: 0 0.5rem;
  .container {
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors["G-888"]};
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .menu {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 0.5rem;
    margin-top: 1rem;
  }
  .menu .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 10px;
    transition: all 0.3s;
    &:hover {
      background-color: ${({ theme }) => theme.colors["B-Tints2"]};
    }
    &:first-child img {
      border-radius: 50%;
    }
  }
  @media (max-width: 1344px) {
    display: none;
  }
`;
