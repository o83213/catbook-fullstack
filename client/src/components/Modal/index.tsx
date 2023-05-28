import React from "react";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { BackDropSTY, ModalSTY } from "./style";
interface ModalProps {
  children: ReactNode;
  onConfirm?: (event: any) => void;
}

const Backdrop = (props: { onClick: (event: any) => void }) => {
  return <BackDropSTY onClick={props.onClick} />;
};

const ModalOverlay = (props: any) => {
  return <ModalSTY>{props.children}</ModalSTY>;
};

const Modal = ({
  children,
  onConfirm = () => {
    console.log("confirm");
  }
}: ModalProps) => {
  return (
    <React.Fragment>
      {typeof window !== "undefined" &&
        createPortal(
          <Backdrop onClick={onConfirm} />,
          document.getElementById("backdrop-root")!
        )}
      {typeof window !== "undefined" &&
        createPortal(
          <ModalOverlay onConfirm={onConfirm}>{children}</ModalOverlay>,
          document.getElementById("overlay-root")!
        )}
    </React.Fragment>
  );
};

export default Modal;
