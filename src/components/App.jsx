import { nanoid } from 'nanoid';
import ContactForm from './Form';
import ContactsList from './ContactsList';
import Filter from './Filter';
import {
  Container,
  Title,
  SecondaryTitle,
} from './StyledComponents/App.styled';
import { useState, useEffect } from 'react';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(savedContacts) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ];
      setContacts(parsedContacts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };
    setContacts(prevState => [...prevState, newContact]);
  };
  const handleChangeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  const handleClickDeleteButton = event => {
    const { value } = event.currentTarget;
    const withoutdeletedContact = contacts.filter(
      contact => contact.id !== value
    );
    setContacts(withoutdeletedContact);
  };

  const normalizedFilterName = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilterName)
  );

  return (
    <Container>
      <Title>Phonebook</Title>

      <ContactForm addContact={handleAddContact} contacts={contacts} />
      <SecondaryTitle>Contacts</SecondaryTitle>
      <Filter filter={filter} changeFilter={handleChangeFilter} />

      <ContactsList
        contacts={filteredContacts}
        onDelete={handleClickDeleteButton}
      />
    </Container>
  );
}
