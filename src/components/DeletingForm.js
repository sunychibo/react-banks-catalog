import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class DeletingForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {modalOpen: false}
  }

  onModalOpen = () => { this.setState({ modalOpen: true })}
  onModalClose = () => { this.setState({ modalOpen: false })}
  onModalSubmit = async () => {
    let storageData = await JSON.parse(localStorage.getItem('banks'));
    let foundIndex = storageData.findIndex(x => x.id === this.props.bank.id);
    storageData.splice(foundIndex, 1);
    console.log(storageData)
    localStorage.setItem('banks', JSON.stringify(storageData));
    this.props.refreshCallback();
    this.onModalClose();
  }

  render() {
    return (
      <Modal 
        trigger={<button 
                    className="ui secondary tiny icon button"
                    onClick={this.onModalOpen}>
                  <i className="close icon"></i>
                </button>}
        basic
        size='small'
        open={this.state.modalOpen}
        onClose={this.onModalClose}>
      <Header icon='close' content="Удалить запись" />
      <Modal.Content>
        <p>
          {`Вы уверены что хотите удалить запись «${this.props.bankName}»`}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button 
          basic
          color='black'
          inverted
          onClick={this.onModalClose}>
          <Icon name='remove' /> Нет
        </Button>
        <Button 
          basic
          color='black'
          inverted
          onClick={this.onModalSubmit}>
          <Icon name='checkmark' /> Да
        </Button>
      </Modal.Actions>
    </Modal>
  )}
}

export default DeletingForm