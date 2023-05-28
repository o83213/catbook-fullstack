import styled from "styled-components";
export const BodySTY = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 3rem auto;
  width: 95%;
  max-width: 25rem;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 0 1rem ${({ theme }) => theme.primaryPalette.BoxShadow};
  padding: 2rem;
  text-align: center;
  .toggle {
    margin-top: 1rem;
    font-size: 14px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors["G-888"]};
    border: none;
    padding: 0.15rem 1.5rem;
  }

  .toggle:hover {
    color: ${({ theme }) => theme.colors["G-333"]};
    background-color: transparent;
  }
  @media (max-width: ${({ theme }) => theme.screen.phone}) {
    h2 {
      font-size: ${({ theme }) => theme.fontSize["18"]};
    }
  }
`;
