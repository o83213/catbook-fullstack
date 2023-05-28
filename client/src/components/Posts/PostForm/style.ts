import styled from "styled-components";

export const BodySTY = styled.form`
  flex-direction: column;
  background: white;
  border-radius: 10px;
  width: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.primaryPalette.Backdrop};
    z-index: 10;
  }
  .header {
    border-bottom: 1px solid #adb5bd;
    padding: 20px;
  }
  .container {
    display: grid;
    row-gap: 10px;
    padding: 20px;
    .userInfo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .content {
      min-height: 150px;
      max-height: 300px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: rgb(219, 219, 219);
      }
      .textBox {
        width: 100%;
        height: auto;
        resize: none;
        padding-bottom: 20px;
        overflow-y: auto;
        font-size: 16px;
        border: none;
        &:focus {
          outline: none;
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .footer {
      .tool_list {
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1.5px solid #adb5bd;
        padding: 10px;
        .icon_list {
          display: flex;
          align-items: center;
          gap: 15px;
        }
      }
    }
  }
  .save {
    border: none;
    background-color: #339af0;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    height: 2.5rem;
    font-weight: bold;
    font-size: 1.05rem;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 30px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
  }
  .tool {
    label {
      cursor: pointer;
    }
    button {
      border: none;
      background: none;
    }
  }
  @media (max-width: ${({ theme }) => theme.screen.tablet}) {
    width: 80vw;
  }
  @media (max-width: ${({ theme }) => theme.screen.phone}) {
    width: 95vw;
    .container .content .textBox {
      font-size: 14px;
    }
  }
`;
