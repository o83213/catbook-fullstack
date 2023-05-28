import styled from "styled-components";

const BodySTY = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-self: center;
  background-color: #fff;
  box-shadow: 0 0 10px ${({ theme }) => theme.primaryPalette.BoxShadow};
  border-radius: 1rem;
  padding: 1rem;
  width: 90vw;
  overflow: hidden;
  max-width: 600px;
  height: auto;
`;

export { BodySTY };
