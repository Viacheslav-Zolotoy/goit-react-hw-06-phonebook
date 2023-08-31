import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import ContactForm from './Form';
import ContactsList from './ContactsList';
import { getContacts, getFilter } from 'redux/selectors';
import Filter from './Filter';
import {
  Container,
  Title,
  SecondaryTitle,
} from './StyledComponents/App.styled';
import { useDispatch } from 'react-redux';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';

export function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };
    dispatch(addContact(newContact));
  };

  const handleChangeFilter = event => {
    dispatch(setFilter(event.currentTarget.value));
  };

  const handleClickDeleteButton = event => {
    const { value } = event.currentTarget;
    dispatch(deleteContact(value));
  };

  const normalizedFilterName = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilterName)
  );
  return (
    <Container>
      <Title>Phonebook</Title>

      <ContactForm handleAddContact={handleAddContact} contacts={contacts} />
      <SecondaryTitle>Contacts</SecondaryTitle>
      <Filter filter={filter} changeFilter={handleChangeFilter} />

      <ContactsList
        contacts={filteredContacts}
        onDelete={handleClickDeleteButton}
      />
    </Container>
  );
}
