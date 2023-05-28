import styled from "styled-components";

export const BodySTY = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
  gap: 10px;
  transition: all 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors["B-Tints2"]};
  }
  img {
    border-radius: 50%;
  }
`;
