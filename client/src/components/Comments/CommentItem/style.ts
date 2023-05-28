import styled from "styled-components";

const BodySTY = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 10fr;
  min-height: 60px;
  .author {
    margin: 10px 10px;
  }
  .content {
    display: flex;
    flex-direction: column;

    padding: 10px;
    gap: 5px;
  }
  .date {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-10%, 25%);
  }
`;
export { BodySTY };
