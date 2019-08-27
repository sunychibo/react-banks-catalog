import React from 'react';
import AppButton from './AppButton';

class ModalMainForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.mainMethod(this.props.bankData.id);
  }
  render() {
    let { onModalClose } = this.props;
    return (
      <form
        className="modal__content"
        onSubmit={this.handleSubmit}
        noValidate>
        <h4 className="modal__heading">Удалить запись</h4>
        <p className="modal__message">
          Вы уверены что хотите удалить запись <strong>«{this.props.bankData.name}»</strong>?
                </p>
        <div className="modal__buttons delete-form__buttons">
          <AppButton
            buttonType="submit"
            buttonText="Удалить"
            buttonCssModifierClass="bank-catalog__button--primary modal__accept-button"
          />
          <AppButton
            buttonType="button"
            purpose={onModalClose}
            buttonText="Отмена"
            buttonCssModifierClass="bank-catalog__button--primary modal__decline-button"
          />
        </div>
      </form>
    );
  }
}

export default ModalMainForm;