import styled from "styled-components";

const ContainerSTY = styled.div`
  .edit {
    position: absolute;
    display: flex;
    padding: 0.5rem;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    border-radius: 50%;
    font-size: 1.5rem;
    transition: all 0.3s;
    &:hover {
      background-color: ${({ theme }) => theme.colors["B-Tints1"]};
    }
  }
  .textContent {
    padding: 10px 0;
  }
`;

const UserInfoSTY = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .detail {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    .authorName {
      font-size: 1.1rem;
      font-weight: bold;
    }
  }
`;

const ImageContainerSTY = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  max-height: 600px;
  @media (max-width: 544px) {
    height: 50vh;
  }
`;

const PostOptionSTY = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 1rem 0.5rem;
  gap: 0.25rem;
  align-items: center;
  .item {
    border: none;
    display: flex;
    height: 2rem;
    cursor: pointer;
    background: none;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.borderRadius.Default};
    gap: 5px;
    transition: all 0.3s;
    font-size: ${({ theme }) => theme.fontSize[16]};
    &:hover {
      background-color: ${({ theme }) => theme.colors["B-Tints2"]};
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors["B-Tints3"]};
    }
  }
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.primaryPalette.Backdrop};
  z-index: 10;
`;

const OptionSTY = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0 1rem;
  position: relative;
  border-top: 0.3rem solid ${({ theme }) => theme.colors.R600};
  background-color: #fff;
  border-radius: 10px;
  width: 300px;
  gap: 10px;
  .icon {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 50%;
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.colors.R600};
    border-radius: 50%;
    svg {
      stroke: none;
      color: #fff;
      width: 30px;
      height: 30px;
    }
  }
  .warning {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    h3 {
      color: ${({ theme }) => theme.colors["G-333"]};
      text-align: center;
    }
    p {
      text-align: center;
    }
  }
  .option-footer {
    display: flex;
    justify-content: space-evenly;
    button {
      padding: 0.5rem 1rem;
      border-radius: 10px;
      background: none;
      transition: all 0.3s;
    }
    .cancel {
      border: 2px solid transparent;
      &:hover {
        border: 2px solid ${({ theme }) => theme.colors["G-555"]};
      }
    }
    .delete {
      border: 1px solid ${({ theme }) => theme.colors.R600};
      color: #fff;
      background: ${({ theme }) => theme.colors.R500};
      &:hover {
        background: ${({ theme }) => theme.colors.R600};
      }
    }
  }
`;

export {
  ContainerSTY,
  PostOptionSTY,
  OptionSTY,
  ImageContainerSTY,
  UserInfoSTY
};
