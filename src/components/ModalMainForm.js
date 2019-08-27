import React, { Fragment } from 'react';
import AppButton from './AppButton';
import Validator from 'validator';

class ModalMainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.bankData.name || '',
      address: props.bankData.address || '',
      bik: props.bankData.bik || '',
      corcount: props.bankData.corcount || '',
      formErrors: {
        name: '',
        address: '',
        bik: '',
        corcount: ''
      }
    }
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'name':
        if (value.length) {
          if (Validator.matches(value, /[а-яА-Я0-9-.,/\ ]+$/)) {
            formErrors.name = '';
          } else {
            formErrors.name = 'Поле содержит недопустимые символы';
          }
        } else {
          formErrors.name = 'Необходимо заполнить поле';
        }
        break;
      case 'address':
        if (value.length) {
          if (Validator.matches(value, /[а-яА-Я0-9-.,/\ ]+$/)) {
            if (value.length < 5) {
              formErrors.address = 'Минимум 5 символов';
            } else {
              formErrors.address = '';
            }
          } else {
            formErrors.address = 'Поле содержит недопустимые символы';
          }
        } else {
          formErrors.address = 'Необходимо заполнить поле';
        }
        break;
      case 'bik':
        if (value.length) {
          if (Validator.matches(value, /^\d+$/)) {
            if (value.length !== 9) {
              formErrors.bik = 'БИК должен содержать 9 цифр';
            } else {
              formErrors.bik = '';
            }
          } else {
            formErrors.bik = 'БИК должен содержать только цифры';
          }
        } else {
          formErrors.bik = 'Необходимо заполнить поле';
        }
        break;
      case 'corcount':
        if (value.length) {
          if (Validator.matches(value, /^\d+$/)) {
            if (value.length !== 20) {
              formErrors.corcount = 'Корсчёт должен содержать 20 цифр';
            } else {
              formErrors.corcount = '';
            }
          } else {
            formErrors.corcount = 'Корсчёт должен содержать только цифры';
          }
        } else {
          formErrors.corcount = 'Необходимо заполнить поле';
        }
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  }

  formValid = ({ formErrors, ...rest }) => {
    let validity = true;
    let emptyInputMessage = 'Необходимо заполнить поле';

    Object.values(formErrors).forEach(value => {
      (value.length > 0) && (validity = false);
    });

    Object.values(rest).forEach((value, index) => {
      if (value === '') {
        validity = false
        switch (index) {
          case 0:
            formErrors.name = emptyInputMessage;
            this.setState({ formErrors });
            break;
          case 1:
            formErrors.address = emptyInputMessage;
            this.setState({ formErrors });
            break;
          case 2:
            formErrors.bik = emptyInputMessage;
            this.setState({ formErrors });
            break;
          case 3:
            formErrors.corcount = emptyInputMessage;
            this.setState({ formErrors });
            break;
          default:
            break;
        }
      };

    });
    return validity;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.formValid(this.state)) {
      if (this.props.modalType === 'Create') {
        this.props.mainMethod(
          this.state.name,
          this.state.address,
          this.state.bik,
          this.state.corcount
        )
        this.props.onModalClose();
      }
      if (this.props.modalType === 'Update') {
        this.props.mainMethod(
          this.props.bankData.id,
          this.state.name,
          this.state.address,
          this.state.bik,
          this.state.corcount,
        )
        this.props.onModalClose();
      }
    }
  }

  render() {
    let { onModalClose } = this.props;
    let { formErrors } = this.state;

    return (
      <Fragment>
        <h4 className="modal__heading">{this.props.modalHeading}</h4>
        <form
          className="modal__content modal__main-form main-form"
          onSubmit={this.handleSubmit}
          noValidate>
          <p className="bank-catalog__input-group main-form__input-group">
            <label
              className="bank-catalog__label main-form__label"
              htmlFor="name">Название</label>
            {!!formErrors.name.length &&
              (<span className="main-form__input-error-message">{formErrors.name}</span>)}
            <input
              className="bank-catalog__input main-form__input"
              id="name"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              placeholder="Сбербанк России"
              noValidate />
          </p>
          <p className="bank-catalog__input-group main-form__input-group">
            <label
              className="bank-catalog__label main-form__label"
              htmlFor="address">Адрес</label>
            {!!formErrors.address.length &&
              (<span className="main-form__input-error-message">{formErrors.address}</span>)}
            <input
              className="bank-catalog__input main-form__input"
              id="address"
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleInputChange}
              placeholder="Москва, 117997, ул. Вавилова, д. 19"
              noValidate />
            
          </p>
          <p className="bank-catalog__input-group main-form__input-group">
            <label
              className="bank-catalog__label main-form__label"
              htmlFor="bik">БИК</label>
            {!!formErrors.bik.length &&
              (<span className="main-form__input-error-message">{formErrors.bik}</span>)}
            <input
              className="bank-catalog__input main-form__input"
              id="bik"
              type="text"
              name="bik"
              value={this.state.bik}
              onChange={this.handleInputChange}
              placeholder="044525225"
              noValidate />
          </p>
          <p className="bank-catalog__input-group main-form__input-group">
            <label
              className="bank-catalog__label main-form__label"
              htmlFor="corcount">Корсчёт</label>
            {!!formErrors.corcount.length &&
              (<span className="main-form__input-error-message">{formErrors.corcount}</span>)}
            <input
              className="bank-catalog__input main-form__input"
              id="corcount"
              type="text"
              name="corcount"
              value={this.state.corcount}
              onChange={this.handleInputChange}
              placeholder="30101810400000000225"
              noValidate />
          </p>
          <div className="modal__buttons main-form__buttons">
            <AppButton
              buttonType="submit"
              buttonText="Сохранить"
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
      </Fragment>
    )
  }
}

export default ModalMainForm;