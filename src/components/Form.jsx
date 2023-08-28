import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormWrapper,
  StyledForm,
  StyledButton,
  StyledInput,
} from './StyledComponents/Form.styled';

function ContactForm({ contacts, addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const existingContact = contacts.find(
      contact => contact.name === name.trim()
    );
    if (existingContact) {
      alert(name + ' is already in contacts!');
      reset();

      return;
    }
    addContact(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          Name
          <StyledInput
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <StyledInput
            value={number}
            onChange={handleChange}
            type="tel"
            name="number"
            pattern="^[+]?[0-9\\.\\-\\s]{1,15}$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <StyledButton type="submit">Add contact</StyledButton>
      </StyledForm>
    </FormWrapper>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactForm;
