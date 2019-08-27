import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import ModalMainForm from './ModalMainForm';
import ModalDeleteForm from './ModalDeleteForm';

class ModalContent extends React.Component {
  render() {
    let { modalType, onClickAway, onModalClose, modalHeading, bankData, mainMethod, modalRef } = this.props;
    let modalContent = null;
    if (modalType === 'Create' || modalType === 'Update') {
      modalContent = <ModalMainForm
        onModalClose={onModalClose}
        modalHeading={modalHeading}
        mainMethod={mainMethod}
        bankData={bankData}
        acceptButtonText="Сохранить"
        modalType={modalType} />
    }
    if (modalType === 'Delete') {
      modalContent = <ModalDeleteForm
        onModalClose={onModalClose}
        modalHeading={modalHeading}
        mainMethod={mainMethod}
        bankData={bankData}
        acceptButtonText="Удалить"
        modalType={modalType} />
    }
    return ReactDOM.createPortal(
      <FocusTrap>
        <aside
          className="modal__cover"
          onClick={onClickAway}>
          <div className="modal" ref={modalRef}>
            <button
              className="modal__close-button"
              onClick={onModalClose}>
              <svg viewBox="0 0 40 40" className="modal__close-icon">
                <path d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
              </svg>
            </button>
            <div className="modal__body">{modalContent}</div>
          </div>
        </aside>
      </FocusTrap>,
      document.body
    );
  }
}

export default ModalContent;
