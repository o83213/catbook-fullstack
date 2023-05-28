import styled from "styled-components";
const BodySTY = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  padding-top: 0.5rem;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.Default};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.Default};
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 50px;
  transition: all 0.3s ease-in-out;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  &:focus-within {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    height: 300px;
    width: 300px;
    overflow-y: scroll;
    background-color: #fff;
    z-index: 5;
    padding-left: 1rem;
    label {
      width: 250px;
      margin-left: 0;
    }
  }
  @media (max-width: ${({ theme }) => theme.screen.phone}) {
    width: 250px;
    &:focus-within {
      width: 100vw;
      label {
        width: calc(100vw - 30px);
      }
    }
  }
`;

const StyledInputBox = styled.label`
  display: flex;
  align-self: flex-start;
  align-items: center;
  margin-left: 4rem;
  border: 1px solid ${({ theme }) => theme.colors["B-Primary"]};
  width: 250px;
  height: 40px;
  padding: 10px;
  border-radius: 20px;
  font-size: 1rem;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  input {
    border: none;
    background: none;
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
  @media (max-width: ${({ theme }) => theme.screen.phone}) {
    width: 2.5rem;
  }
`;

const StyledSearchResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export { BodySTY, StyledInputBox, StyledSearchResult };
