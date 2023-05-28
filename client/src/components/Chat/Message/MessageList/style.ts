import styled from "styled-components";

const BodySTY = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  overflow-y: scroll;
  padding: 0.5rem;
  gap: 0.5rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export { BodySTY };
