import React, { useState } from "react";
import styled from "styled-components";
//
import AuthForm from "@contents/Login/AuthForm";
import Modal from "@components/Modal";
import Spinner from "@components/Spinner";

//
export const BodySTY = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors["B-Tints3"]};
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
`;
//
export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <BodySTY>
      {loading && (
        <Modal>
          <Spinner height={32} width={32} />
        </Modal>
      )}
      <AuthForm setModalLoading={setLoading} />
    </BodySTY>
  );
}
