import React, { Component, Fragment } from 'react';
import ModalContent from './ModalContent';
import AppButton from './AppButton';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  onCreate = async (name, address, bik, corcount) => {
    let storageData = await JSON.parse(localStorage.getItem('banks'));
    let banksIDs = [];
    let maxIDcount = null;

    for (let i = 0; i < storageData.length; i++) {
      banksIDs[i] = storageData[i].id;
    }

    maxIDcount = Math.max.apply(null, banksIDs);
    storageData[storageData.length] = {
      id: maxIDcount + 1,
      name: name,
      address: address,
      bik: bik,
      corcount: corcount
    };

    localStorage.setItem('banks', JSON.stringify(storageData));
    this.props.refreshCallback();
  };

  onUpdate = async (id, name, address, bik, corcount) => {
    let storageData = await JSON.parse(localStorage.getItem('banks'));
    let foundIndex = storageData.findIndex(x => x.id === id);

    storageData[foundIndex] = {
      id: id,
      name: name,
      address: address,
      bik: bik,
      corcount: corcount
    };

    localStorage.setItem('banks', JSON.stringify(storageData));
    this.props.refreshCallback();
  };

  onDelete = async (bankID) => {
    let storageData = await JSON.parse(localStorage.getItem('banks'));
    let foundIndex = storageData.findIndex(x => x.id === bankID);

    storageData.splice(foundIndex, 1);

    localStorage.setItem('banks', JSON.stringify(storageData));
    this.props.refreshCallback();
  };

  onModalOpen = () => {
    this.setState({ isOpen: true });
    this.toggleScrollLock();
  };

  onModalClose = () => {
    this.setState({ isOpen: false });
    this.toggleScrollLock();
  };

  onClickAway = (event) => {
    if (this.modalNode && this.modalNode.contains(event.target)) return;
    this.onModalClose();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('bank-catalog--lock-scroll');
  };

  render() {
    let isOpen = this.state.isOpen;
    let { modalType, modalHeading, buttonCssModifierClass, buttonIcon, buttonText, bankData } = this.props;
    return (
      <Fragment>
        <AppButton
          buttonType="button"
          purpose={this.onModalOpen}
          buttonText={buttonText}
          buttonIcon={buttonIcon}
          buttonCssModifierClass={buttonCssModifierClass}
        />
        {isOpen &&
          <ModalContent
            modalRef={n => this.modalNode = n}
            modalType={modalType}
            onClickAway={this.onClickAway}
            onModalClose={this.onModalClose}
            modalHeading={modalHeading}
            bankData={bankData || {}}
            mainMethod={this[`on${modalType}`]}
          />
        }
      </Fragment>
    );
  }
}

export default Modal;
