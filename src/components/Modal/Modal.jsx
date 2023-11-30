import { useEffect } from 'react';
import { ModalContent, ModalOverlay } from './Modal.styled';

export const Modal = ({ onCloseModal, children }) => {
  const keyDown = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

  const clickOverlay = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  });
  // componentDidMount() {
  //   window.addEventListener('keydown', this.keyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.keyDown);
  // }

  return (
    <ModalOverlay onClick={clickOverlay}>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
