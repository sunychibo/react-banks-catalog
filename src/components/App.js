import React from 'react';
import bankData from '../data.json';
import SearchBar from './SearchBar';
import BankList from './BankList';

if (localStorage.getItem('banks') === null) {
    localStorage.setItem('banks', JSON.stringify(bankData));
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { banks_full_list: [], banks_searched_list: [], term: ''};
    }
    bankListRefresher = async () => {
        const storageBankList = await JSON.parse(localStorage.getItem('banks'));
        this.setState({ banks_full_list: storageBankList });
    }
    componentDidMount() {
        this.bankListRefresher();
    }
    onSearchTyping = (term) => {
        const bankValueComparer = (bank, propertySearchedIn) => {
            return bank[`${propertySearchedIn}`].toLowerCase().indexOf(term.toLowerCase())
        }
        let banksFullList = this.state.banks_full_list;
        let banksSearchedList = banksFullList.filter(
            (bank) => {
                if (bankValueComparer(bank, 'bik') !== -1 || bankValueComparer(bank, 'name') !== -1) {
                    return true;
                }
                return false;
            }
        )
        this.setState({ term: term, banks_searched_list: banksSearchedList });
    }
    render() {
        return (
            <div className="ui middle container" style={{padding: '2em 0'}}>
                <SearchBar
                    onTyping={this.onSearchTyping}
                    refreshCallback={this.bankListRefresher}/>
                <BankList
                    banks={this.state.term ? this.state.banks_searched_list : this.state.banks_full_list}
                    refreshCallback={this.bankListRefresher}/>
            </div>
        );
    }
}

export default App;