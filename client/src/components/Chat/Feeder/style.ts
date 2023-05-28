import styled from "styled-components";

export const BodySTY = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 450px;
  width: 300px;
  background-color: #fff;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.Default};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.Default};
  box-shadow: 0 0 1rem ${({ theme }) => theme.primaryPalette.BoxShadow};
`;
