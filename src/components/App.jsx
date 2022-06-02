import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import EmptyMessage from './EmptyMessage';
import Filter from './Filter';
export class App extends Component {
  INITIAL_STATE = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  state = {
    contacts: [...this.INITIAL_STATE],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // if (parsedContacts !== null) if localStorage empty
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = ({ name, number }) => {
    this.setState(prevState => {
      const { contacts } = this.state;
      const allContacts = contacts.reduce((acc, contact) => {
        acc.push(contact.name.toLocaleLowerCase());
        return acc;
      }, []);

      if (allContacts.includes(name.toLocaleLowerCase())) {
        return alert(`${name} already in contacts.`);
      }
      const newContact = { id: nanoid(), name, number };
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  changeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  makeFilteredMarkup = () => {
    const lowerCaseFilter = this.state.filter.toLocaleLowerCase();
    const filteredArray = [...this.state.contacts].filter(contact =>
      contact.name.toLocaleLowerCase().includes(lowerCaseFilter)
    );
    return filteredArray;
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredArray = this.makeFilteredMarkup();
    return (
      <div className="wrapper">
        <div className="header-section">
          <h1>Phonebook</h1>
        </div>
        <div className="main-section">
          <ContactForm onSubmit={this.addContact} />
          <div className="contacts-secton">
            <h2 className="page-title">Your contacts</h2>
            {contacts.length > 0 ? (
              <>
                <Filter value={filter} onChange={this.changeFilter} />

                <ContactList
                  contacts={filteredArray}
                  onDelClick={this.deleteContact}
                />
              </>
            ) : (
              <EmptyMessage />
            )}
          </div>
        </div>
      </div>
    );
  }
}
