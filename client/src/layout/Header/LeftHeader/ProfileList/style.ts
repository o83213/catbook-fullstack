import styled from "styled-components";
export const BodySTY = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .profile-item {
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 10px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.colors["B-Tints3"]};
      font-weight: ${({ theme }) => theme.fontWeight["Semi-bold"]};
    }
    .profile-info {
      font-size: 1.1rem;
    }
  }
`;
