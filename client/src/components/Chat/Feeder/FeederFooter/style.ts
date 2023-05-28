import styled from "styled-components";

export const BodySTY = styled.form`
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  .icon {
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: ${({ theme }) => theme.colors["B-Primary"]};
    font-size: ${({ theme }) => theme.fontSize["24"]};
  }
`;

export const StyledInputBox = styled.label`
  background-color: ${({ theme }) => theme.colors["B-Tints3"]};
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 20px;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  input {
    border: none;
    background: none;
    width: 230px;
    height: 100%;
    color: ${({ theme }) => theme.colors["G-333"]};
    &:focus {
      outline: none;
    }
  }
  @media (max-width: ${({ theme }) => theme.screen.phone}) {
    width: 2.5rem;
  }
`;
