import styled from "styled-components";
export const BodySTY = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: 60px;
  box-shadow: 0 0 1rem ${({ theme }) => theme.primaryPalette.BoxShadow};
  z-index: 5;
  background-color: #fff;
`;
