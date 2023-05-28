import styled from "styled-components";

const UserInfoSTY = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid black;
  margin: 1rem;
  padding: 20px 0;
  p {
    cursor: pointer;
    flex: 1;
    border: none;
    background-color: #e9ecef;
    border-radius: 1rem;
    padding: 0.5rem;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background-color: #ced4da;
    }
  }
`;

const ToolListSTY = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tool-button-list {
    display: flex;
    gap: 1rem;
  }
  .tool-button-list button {
    border: none;
    background: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .action {
    cursor: pointer;
    border: none;
    background: #339af0;
    border-radius: 10px;
    padding: 0.5rem;
    font-size: 1.1rem;
    color: #fff;
    &:hover {
      background-color: #1c7ed6;
    }
  }
`;

export { UserInfoSTY, ToolListSTY };
