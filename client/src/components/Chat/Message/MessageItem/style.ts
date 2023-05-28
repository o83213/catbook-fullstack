import styled from "styled-components";

const BodySTY = styled.div<{ isUser: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  .message {
    display: flex;
    flex-direction: column;
    /* border: 1px solid; */
    align-items: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
    gap: 0.25rem;
    width: 100%;
  }
  .message-body {
    background: ${({ isUser }) => (isUser ? "#58bf56" : "#e5e6ea")};
    color: ${({ isUser }) => (isUser ? "#fff" : "#333")};
    padding: 0.75rem;
    border-radius: ${({ theme }) => theme.borderRadius.Default};
    max-width: 85%;
  }
  .message-time {
    color: ${({ theme }) => theme.colors["G-888"]};
    font-size: ${({ theme }) => theme.fontSize["12"]};
    border-radius: ${({ theme }) => theme.borderRadius["Default"]};
  }
`;

export { BodySTY };
