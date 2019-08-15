import React from 'react';
import BankCard from './BankCard';
import './BankList.css';

const BankList = (props) => {
    const banks = props.banks.map((bank) => {
        return <BankCard key={bank.id} bank={bank} refreshCallback={props.refreshCallback}/>
    });
    return (
        <div className="ui segment">
            <table className="ui aligned table catalog_list__table">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Адрес</th>
                    <th>БИК</th>
                    <th>Корсчёт</th>
                    <th>Править</th>
                </tr>
                </thead>
                <tbody>{banks}</tbody>
            </table>
        </div>
    )    
}

export default BankList;