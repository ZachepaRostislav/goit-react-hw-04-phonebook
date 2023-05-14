import React, { useState, useEffect } from 'react';
import Form from './Form';
import Contacts from './Contacts';
import FindContact from './FindContact';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const onHandlerSubmitForm = data => {
    const existingContact = contacts.find(
      user => user.name.toLowerCase() === data.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${existingContact.name} is already in contacts`);
      return;
    }

    const existingInitialContact = contacts.find(
      user => user.name.toLowerCase() === data.name.toLowerCase()
    );

    if (existingInitialContact) {
      alert(`${existingInitialContact.name}is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      ...data,
    };

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const findContact = e => {
    setFilter(e.currentTarget.value);
  };

  const getFindContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContact = getFindContact();

  return (
    <>
      <Form onSubmit={onHandlerSubmitForm} />
      <FindContact value={filter} findContact={findContact} />
      {visibleContact.length > 0 && (
        <Contacts contacts={visibleContact} onDeleteContact={deleteContact} />
      )}
    </>
  );
}
