import styled from "styled-components";
export const BackDropSTY = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: ${({ theme }) => theme.primaryPalette.Backdrop};
`;

export const ModalSTY = styled.div`
  position: fixed;
  background: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;
