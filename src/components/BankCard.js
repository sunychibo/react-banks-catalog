import React from 'react';
import Modal from './Modal';
import AppIcons from '../icons';

class BankCard extends React.Component {
  render() {
    const { name, address, bik, corcount } = this.props.bank;
    return (
      <tr className="bank-list__data-row">
        <td className="bank-list__data-cell" data-label="Название">{name}</td>
        <td className="bank-list__data-cell" data-label="Адрес">{address}</td>
        <td className="bank-list__data-cell" data-label="БИК">{bik}</td>
        <td className="bank-list__data-cell" data-label="Корсчёт">{corcount}</td>
        <td className="bank-list__data-cell" data-label="">
          <Modal
            modalType="Update"
            modalHeading="Изменение записи"
            buttonCssModifierClass="bank-catalog__button--secondary button-mutate--inverse"
            buttonIcon={AppIcons.pencil}
            buttonText="Изменить"
            bankData={this.props.bank}
            refreshCallback={this.props.refreshCallback} />
          <Modal
            modalType="Delete"
            modalHeading="Удаление записи"
            buttonCssModifierClass="bank-catalog__button--secondary button-mutate--inverse"
            buttonIcon={AppIcons.cross}
            buttonText="Удалить"
            bankData={this.props.bank}
            refreshCallback={this.props.refreshCallback} />
        </td>
      </tr>
    )
  }
}

export default BankCard;