import { useEffect } from 'react';
import { ModalContent, ModalOverlay } from './Modal.styled';

export const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    const keyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onCloseModal]);

  const clickOverlay = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    <ModalOverlay onClick={clickOverlay}>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
