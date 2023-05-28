import styled from "styled-components";

export const BodySTY = styled.div`
  border-radius: 10px;
  padding: 5px;
  position: relative;
  .close-image {
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    width: 36px;
    height: 36px;
    font-size: 20px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background-color: #fff;
    transform: translate(-50%, 50%);
    z-index: 5;
    &:hover {
      background-color: #ddd;
    }
  }
  .image-container {
    position: relative;
    height: 500px;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
  }
`;
