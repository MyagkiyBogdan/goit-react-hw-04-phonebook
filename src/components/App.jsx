import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import EmptyMessage from './EmptyMessage';
import Filter from './Filter';

const INITIAL_STATE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [...INITIAL_STATE]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Первый рендер: поставить пустой массив зависимостей []
  // Каждый рендер: если не указать массив зависимостей
  // Каждый рендер при изменении пропса или стейта (+ первый рендер): указываем в массив зависимостей нужные пропы или стейт.
  // Последний рендер: для этого из useEffect нужно вернуть функцию отчистки (с пустым массивом зависимостей)

  const addContact = ({ name, number }) => {
    setContacts(prevState => {
      const allContacts = prevState.reduce((acc, contact) => {
        acc.push(contact.name.toLocaleLowerCase());
        return acc;
      }, []);

      if (allContacts.includes(name.toLocaleLowerCase())) {
        alert(`${name} already in contacts.`);
        return contacts;
      }

      const newContact = { id: nanoid(), name, number };
      return [...prevState, newContact];
    });
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const makeFilteredMarkup = () => {
    const lowerCaseFilter = filter.toLocaleLowerCase();
    const filteredArray = [...contacts].filter(contact =>
      contact.name.toLocaleLowerCase().includes(lowerCaseFilter)
    );
    return filteredArray;
  };

  const filteredArray = makeFilteredMarkup();

  return (
    <div className="wrapper">
      <div className="header-section">
        <h1>Phonebook</h1>
      </div>
      <div className="main-section">
        <ContactForm onSubmit={addContact} />
        <div className="contacts-secton">
          <h2 className="page-title">Your contacts</h2>
          {contacts.length > 0 ? (
            <>
              <Filter value={filter} onChange={changeFilter} />

              <ContactList
                contacts={filteredArray}
                onDelClick={deleteContact}
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
