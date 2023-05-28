import styled from "styled-components";
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .control label {
    display: block;
    font-weight: bold;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  .control input {
    font: inherit;
    background-color: ${({ theme }) => theme.colors["B-Tints3"]};
    border-radius: ${({ theme }) => theme.borderRadius.Medium};
    border: none;
    width: 100%;
    text-align: left;
    padding: 1rem;
    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 3px ${({ theme }) => theme.colors["B-Tints1"]};
    }
  }

  .control .error {
    color: ${({ theme }) => theme.colors["R400"]};
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .actions button {
    cursor: pointer;
    font: inherit;
    background-color: ${({ theme }) => theme.colors["B-Primary"]};
    color: #fff;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.Large};
    padding: 0.75rem 2.5rem;
    transition: all 0.3s;
  }

  .actions button:hover {
    background-color: ${({ theme }) => theme.colors["B-ShadesDark"]};
  }

  .actions .toggle {
    margin-top: 1rem;
    background-color: transparent;
    color: ${({ theme }) => theme.colors["G-888"]};
    border: none;
    padding: 0.15rem 1.5rem;
  }

  .actions .toggle:hover {
    color: ${({ theme }) => theme.colors["G-333"]};
    background-color: transparent;
  }
  @media (max-width: ${({ theme }) => theme.screen.phone}) {
    h2 {
      font-size: ${({ theme }) => theme.fontSize["18"]};
    }
  }
`;
