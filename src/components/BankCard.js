import React from 'react';
import CreateUpdateForm from './CreateUpdateForm';
import DeletingForm from './DeletingForm';

class BankCard extends React.Component {
    render() {
        const {name, address, bik, corcount} = this.props.bank;
        return (
            <tr>
                <td>{name}</td>
                <td>{address}</td>
                <td>{bik}</td>
                <td>{corcount}</td>
                <td style={{ display: 'flex' }}>
                    <CreateUpdateForm
                        method="edit"
                        headingMessage={`Редактировать запись «${name}»`}
                        headingIcon="pencil alternate"
                        bank={this.props.bank}
                        refreshCallback={this.props.refreshCallback}/>
                    <DeletingForm 
                        bankName={name}
                        bank={this.props.bank}
                        refreshCallback={this.props.refreshCallback}/>
                </td>
            </tr>
        )
    }
}

export default BankCard;