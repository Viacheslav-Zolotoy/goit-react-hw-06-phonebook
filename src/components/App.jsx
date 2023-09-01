import ContactForm from './Form';
import ContactsList from './ContactsList';
import Filter from './Filter';
import {
  Container,
  Title,
  SecondaryTitle,
} from './StyledComponents/App.styled';

export function App() {
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm />
      <SecondaryTitle>Contacts</SecondaryTitle>
      <Filter />
      <ContactsList />
    </Container>
  );
}
