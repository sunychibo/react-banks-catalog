import React from 'react';
import Modal from './Modal';
import AppIcons from '../icons';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: '' }
  }
  onInputTyping = (event) => {
    this.setState({ term: event.target.value });
    this.props.onTyping(event.target.value);
  }
  render() {
    return (
      <form
        className="bank-catalog__search-bar"
        onSubmit={(event) => { event.preventDefault() }}
        noValidate>
        <p className="bank-catalog__input-group search-bar__input-group">
          <label className="bank-catalog__label search-bar__label" htmlFor="email">Поиск по справочнику</label>
          <input
            className="bank-catalog__input search-bar__input"
            id="email"
            type="text"
            name="search"
            value={this.state.term}
            onChange={this.onInputTyping}
            placeholder="Сбербанк"
            noValidate />
        </p>
        <Modal
          modalType="Create"
          modalHeading="Создание записи"
          buttonCssModifierClass="bank-catalog__button--primary button-mutate--forward"
          buttonIcon={AppIcons.plus}
          buttonText="Добавить запись"
          refreshCallback={this.props.refreshCallback} />
      </form>
    );
  }
}

export default SearchBar;
