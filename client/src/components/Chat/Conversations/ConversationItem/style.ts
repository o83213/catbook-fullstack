import styled from "styled-components";

const ContainerSTY = styled.div`
  position: relative;
  .menu-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    color: transparent;
    padding: 0.5rem;
    right: 0;
    top: 0;
    transform: translate(-25%, 30%);
    transition: all 0.3s;
    font-size: 1rem;
    &:hover {
      border: 1.5px solid ${({ theme }) => theme.colors["B-Primary"]};
      color: black;
      background-color: ${({ theme }) => theme.colors["B-Tints3"]};
    }
  }
`;

const BodySTY = styled.div<{ isSelected: boolean }>`
  position: relative;
  width: 100%;
  height: 3.5rem;
  gap: 0.25rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.Default};
  &:hover {
    background-color: ${({ theme }) => theme.colors["B-Tints3"]};
    .menu-button {
      display: flex;
    }
  }
  &:hover + button {
    border: 1.5px solid ${({ theme }) => theme.colors["B-Primary"]};
    color: black;
    background-color: #fff;
  }
`;

const ContentSTY = styled.div`
  display: flex;
  width: 70%;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  .content-message {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: ${({ theme }) => theme.fontSize["14"]};
    .participant-name {
      font-size: ${({ theme }) => theme.fontSize["18"]};
      font-weight: ${({ theme }) => theme.fontWeight["Semi-bold"]};
    }
    .latest-message {
      color: ${({ theme }) => theme.colors["G-333"]};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .content-time {
    font-size: ${({ theme }) => theme.fontSize["12"]};
  }
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

// const MenuSTY = styled.div`
//   position: absolute;
//   display: flex;
//   top: 0;
//   left: 0;
//   background-color: #fff;
//   box-shadow: 0 0 10px ${({ theme }) => theme.primaryPalette["BoxShadow"]};
//   border-radius: ${({ theme }) => theme.borderRadius["Default"]};
//   padding: 0.25rem;
//   .menu-item {
//     cursor: pointer;
//     display: flex;
//     border: none;
//     background: transparent;
//     align-items: center;
//     padding: 0.5rem;
//     gap: 0.5rem;
//     border-radius: ${({ theme }) => theme.borderRadius["Default"]};
//     transition: all 0.3s;
//     &:hover {
//       background-color: ${({ theme }) => theme.colors["B-Tints3"]};
//     }
//   }
// `;
// const LoadingContainer = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: ${({ theme }) => theme.primaryPalette.Backdrop};
//   z-index: 10;
// `;
export { BodySTY, ContentSTY, ContainerSTY, OptionSTY };
