import React from 'react';
import './SearchBar.css';
import CreateUpdateForm from './CreateUpdateForm';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {term: ''}
    }
    onInputTyping = (event) => {
        this.setState({term: event.target.value});
        this.props.onTyping(event.target.value);
    }
    render() {
        return (
            <div className="ui segment">
                <form
                    className="ui form form--search"
                    onSubmit={(event) => {event.preventDefault()}}>
                    <div className="ui transparent left icon input input-search_container">
                        <input
                            placeholder="Введите название или БИК"
                            type="text"
                            value={this.state.term}
                            onChange={this.onInputTyping}/>
                        <i className="search icon"></i>
                    </div>
                    <CreateUpdateForm
                        method="add"
                        headingMessage="Добавить новую запись"
                        headingIcon="plus"
                        refreshCallback={this.props.refreshCallback}/>
                </form>
            </div>
        );
    }
}

export default SearchBar;
