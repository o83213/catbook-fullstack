import styled from "styled-components";

const BodySTY = styled.form`
  padding: 5px;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 10fr;
  .author {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    color: #333;
    font-size: 1rem;
    padding: 0.5rem 0.5rem;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    border: 1px solid #888;
    width: 100%;
    height: 100%;
    display: block;
    &:focus {
      outline: none;
    }
  }

  button {
    border: none;
    background: none;
  }
`;
export { BodySTY };
