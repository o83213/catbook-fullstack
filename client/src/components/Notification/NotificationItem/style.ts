import styled from "styled-components";

export const BodySTY = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  .notification-info {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .notification-options {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    button {
      border: none;
      padding: 0.5rem 0.8rem;
      border-radius: 10px;
      width: 5rem;
      transition: all 0.3s;
      font-weight: ${({ theme }) => theme.fontWeight["Semi-bold"]};
    }
    .accept {
      background-color: ${({ theme }) => theme.colors["B-Primary"]};
      color: #fff;

      &:hover {
        background-color: ${({ theme }) => theme.colors["B-ShadesDark"]};
      }
    }
    .reject {
      background-color: transparent;
      &:hover {
        box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors["G-888"]};
      }
    }
  }
`;
