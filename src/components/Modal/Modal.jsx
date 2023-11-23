import { Component } from 'react';
import { ModalContent, ModalOverlay } from './Modal.styled';
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  clickOverlay = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <ModalOverlay onClick={this.clickOverlay}>
        <ModalContent>{this.props.children}</ModalContent>
      </ModalOverlay>
    );
  }
}

export default Modal;
