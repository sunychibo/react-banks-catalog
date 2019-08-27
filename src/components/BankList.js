import React from 'react';
import BankCard from './BankCard';

const BankList = (props) => {
  const banks = props.banks.map((bank) => {
    return <BankCard key={bank.id} bank={bank} refreshCallback={props.refreshCallback} />
  });
  return (
    <table className="bank-catalog__bank-list bank-list">
      <thead className="bank-list__header">
        <tr className="bank-list__header-row">
          <th className="bank-list__header-cell">Название</th>
          <th className="bank-list__header-cell">Адрес</th>
          <th className="bank-list__header-cell">БИК</th>
          <th className="bank-list__header-cell">Корсчёт</th>
          <th className="bank-list__header-cell">Править</th>
        </tr>
      </thead>
      <tbody>{banks}</tbody>
    </table>
  )
}

export default BankList;