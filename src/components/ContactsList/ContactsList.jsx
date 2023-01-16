import { usePhonebookContext } from '../context/PhonebookContext/PhonebookContext';
import ContactsProvider from 'components/context/ContactsContext/ContactsContext';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import css from './ContactsList.module.css';
import PropTypes from 'prop-types';

export const ContactsList = () => {
  const { contacts, filter, onContactDelete } = usePhonebookContext();
  const filteredArray = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <ol className={css.list}>
      <h5>Contacts</h5>
      {filteredArray.map(({ id, name, number }) => (
        <ContactsProvider value={{ id, name, number }}>
          <ContactListItem
            key={id}
            contact={{ id, name, number }}
            onDelete={onContactDelete}
          />
        </ContactsProvider>
      ))}
    </ol>
  );
};

ContactsProvider.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  id: PropTypes.string,
  onContactDelete: PropTypes.func,
};
