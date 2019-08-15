import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class CreateUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', address: '', bik: '', corcount: '', modalOpen: false}
    }

    onModalOpen = () => {
        let {name, address, bik, corcount} = this.props.bank || '';
        this.setState({name: name, address: address, bik: bik, corcount: corcount, modalOpen: true})
    }

    onModalClose = () => {
        this.setState({ modalOpen: false });
    }

    onModalSubmit = async () => {
        let storageData = await JSON.parse(localStorage.getItem('banks'));
        if (this.props.method === 'edit') {
            let bankID = this.props.bank.id;
            let foundIndex = storageData.findIndex(x => x.id === bankID);
            storageData[foundIndex] = {
                id: bankID,
                name: this.state.name,
                address: this.state.address,
                bik: this.state.bik,
                corcount: this.state.corcount
            };
        } else if (this.props.method === 'add') {
            let banksIDs = [];
            let maxIDcount = null;
            for (let i = 0; i < storageData.length; i++) {
                banksIDs[i] = storageData[i].id;
            }
            maxIDcount = Math.max.apply(null, banksIDs);
            storageData[storageData.length] = {
                id: maxIDcount + 1,
                name: this.state.name,
                address: this.state.address,
                bik: this.state.bik,
                corcount: this.state.corcount
            };
        }
        localStorage.setItem('banks', JSON.stringify(storageData));
        this.props.refreshCallback();
        this.onModalClose();
    }

    render() {
        let buttonType = null;

        if (this.props.method === 'edit') {
            buttonType = <button 
                            className="ui button secondary tiny button--edit icon"
                            onClick={this.onModalOpen}>
                            <i className="edit outline icon"></i>
                        </button>
        }
        if (this.props.method === 'add') {
            buttonType = <button 
                            className="ui button secondary tiny button--add"
                            onClick={this.onModalOpen}>
                            Добавить запись
                        </button>
        }

        return (
            <Modal 
                trigger={buttonType} 
                closeIcon
                open={this.state.modalOpen}
                onClose={this.onModalClose}>
                <Header icon={this.props.headingIcon} content={this.props.headingMessage} />
                <Modal.Content className="modal-form__content">
                    <form className="ui form">
                        <div className="required field">
                            <label htmlFor="name">Название</label>
                            <div className="ui input">
                                <input
                                    id="name"
                                    value={this.state.name || ''}
                                    type="text"
                                    placeholder="Сбербанк России"
                                    onChange={(event) => this.setState({name: event.target.value})}/>
                            </div>
                                
                        </div>
                        <div className="required field">
                            <label htmlFor="address">Адрес</label>
                            <div className="ui input">
                                <input
                                    id="address"
                                    value={this.state.address || ''}
                                    type="text"
                                    placeholder="Москва, 117997, ул. Вавилова, д. 19"
                                    onChange={(event) => this.setState({address: event.target.value})}/>
                            </div>
                        </div>
                        <div className="required field">
                            <label htmlFor="bik">БИК</label>
                            <div className="ui input">
                                <input
                                    id="bik"
                                    value={this.state.bik || ''}
                                    type="text"
                                    placeholder="044525225"
                                    onChange={(event) => this.setState({bik: event.target.value})}/>
                            </div>
                        </div>
                        <div className="required field">
                            <label htmlFor="corcount">Корсчет</label>
                            <div className="ui input">
                                <input
                                    id="corcount"
                                    value={this.state.corcount || ''}
                                    type="text"
                                    placeholder="30101810400000000225"
                                    onChange={(event) => this.setState({corcount: event.target.value})}/>
                            </div>
                        </div>
                    </form>    
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        className="secondary"
                        onClick={this.onModalClose}>
                        <Icon name='remove'/>Закрыть
                    </Button>
                    <Button 
                        className="secondary"
                        onClick={this.onModalSubmit}
                        disabled={
                            !this.state.name ||
                            !this.state.address ||
                            !this.state.bik ||
                            !this.state.corcount
                        }>
                        <Icon name='checkmark'/>Сохранить
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
    
export default CreateUpdateForm;