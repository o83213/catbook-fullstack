import styled from "styled-components";
//
const BodySTY = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  padding-right: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  .notificationContainer {
    position: absolute;
    top: 50px;
    right: 10px;
    width: 320px;
    /* min-height: 100px; */
    background-color: #fff;
    z-index: 10;
    border-radius: ${({ theme }) => theme.borderRadius.Default};
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.primaryPalette.BoxShadow};
  }
  @media (max-width: ${({ theme }) => theme.screen.phone}) {
    .notificationContainer {
      width: 80vw;
    }
  }
`;

const IconSTY = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors["G-555"]};
  background-color: ${({ theme }) => theme.colors["B-Tints3"]};
  height: 40px;
  width: 40px;
  transition: all 0.3s;
  &:hover {
    color: ${({ theme }) => theme.colors["G-333"]};
    background-color: ${({ theme }) => theme.colors["B-Tints2"]};
  }
  .notification-count {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    width: 0.9rem;
    height: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize["12"]};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors["R400"]};
    color: #fff;
  }
`;

export { BodySTY, IconSTY };
