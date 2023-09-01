import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

import {
  List,
  ListItem,
  ContactText,
  DeleteButton,
} from './StyledComponents/Contacts.styled';

function ContactsList() {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const normalizedFilterName = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilterName)
  );

  const handleClickDeleteButton = event => {
    const { value } = event.currentTarget;
    dispatch(deleteContact(value));
  };
  return (
    <div>
      <List>
        {filteredContacts.map(contact => (
          <ListItem key={contact.id}>
            <ContactText>{contact.name}:</ContactText>
            <ContactText>{contact.number}</ContactText>
            <DeleteButton
              type="button"
              name="delete"
              value={contact.id}
              onClick={handleClickDeleteButton}
            >
              Delete
            </DeleteButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ContactsList;
