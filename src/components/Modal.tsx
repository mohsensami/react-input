import { ReactNode } from "react";
import "./style.css";

interface ModalProps {
  showModal: boolean;
  header: string;
  onClose: () => void;
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Modal = ({
  showModal,
  onClose,
  header,
  children,
  size = "md",
}: ModalProps) => {
  let width = "";
  switch (size) {
    case "sm":
      width = "20rem";
      break;
    case "md":
      width = "30rem";
      break;
    case "lg":
      width = "40rem";
      break;
    case "xl":
      width = "50rem";
      break;
    default:
      break;
  }
  if (!showModal) return null;
  return (
    <div className="modal__overlay">
      <div style={{ width }} className="modal__wrapper">
        <div className="modal__header">{header}</div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">
          <button className="modal__close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
