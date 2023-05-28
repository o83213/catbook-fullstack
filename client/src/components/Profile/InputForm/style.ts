import styled from "styled-components";

const StyledForm = styled.form<{ isLoading: boolean }>`
  display: ${({ isLoading }) => (isLoading ? "none" : "flex")};
  flex-direction: column;
  max-height: 80vh;
  overflow-y: scroll;
  gap: 1rem;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 50vw;
  &::-webkit-scrollbar {
    display: none;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    border: none;
    background-color: ${({ theme }) => theme.colors.R400};
    padding: 0.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.Default};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    &:hover {
      background-color: ${({ theme }) => theme.colors.R500};
    }
  }
  .picture-list {
    display: flex;
    gap: 50px;
    .picture-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      label {
        cursor: pointer;
        width: "100px";
        height: "100px";
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.screen.laptop}) {
    width: 65vw;
  }
  @media (max-width: ${({ theme }) => theme.screen.tablet}) {
    width: 75vw;
  }
  @media (max-width: ${({ theme }) => theme.screen.phone}) {
    width: 95vw;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledInputItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  input {
    width: 100%;
    padding: 1rem;
    border: none;
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors["B-Tints3"]};
    border-radius: ${({ theme }) => theme.borderRadius.Medium};
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors["B-Primary"]};
    }
    &:disabled {
      background-color: transparent;
    }
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  padding: 10px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.Medium};
  color: #fff;
  background: ${({ theme }) => theme.colors["B-Primary"]};
  transition: all 0.3s;
  font-size: ${({ theme }) => theme.fontSize["20"]};
  &:hover {
    background: ${({ theme }) => theme.colors["B-ShadesLight"]};
  }
`;

export { StyledForm, InputContainer, StyledInputItem, StyledButton };
