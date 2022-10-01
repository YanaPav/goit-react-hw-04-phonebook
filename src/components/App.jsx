import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(isSavedContacts());
  const [filter, setFilter] = useState('');

  function isSavedContacts() {
    let savedContacts = [];
    const localStorageContacts = localStorage.getItem(CONTACTS_KEY);

    if (localStorageContacts?.length > 0) {
      return (savedContacts = JSON.parse(localStorageContacts));
    }
    return savedContacts;
  }

  useEffect(() => {
    return localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const isDuplicate = ({ name }) => {
    const result = contacts.find(
      contactItem => contactItem.name.toLowerCase() === name.toLowerCase()
    );
    return result;
  };

  const addContact = contactObject => {
    if (isDuplicate(contactObject)) {
      return alert(`${contactObject.name} is alredy in contacts`);
    }

    return setContacts(prev => [...prev, contactObject]);
  };

  const handlerFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  const filtredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handlerFilterChange} />
      <ContactList contacts={filtredContacts} handleClick={deleteContact} />
    </div>
  );
};
