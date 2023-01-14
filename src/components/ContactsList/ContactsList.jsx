import { useAppContext } from 'components/App';
import { createContext, useContext } from 'react';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import css from './ContactsList.module.css';
import PropTypes from 'prop-types';

export const contactsContext = createContext();
export const useContactsContext = () => useContext(contactsContext);

export const ContactsList = () => {
  const { contacts, filter, onContactDelete } = useAppContext();
  const filteredArray = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <ol className={css.list}>
      <h5>Contacts</h5>
      {filteredArray.map(({ id, name, number }) => (
        <contactsContext.Provider value={{ id, name, number }}>
          <ContactListItem
            key={id}
            contact={{ id, name, number }}
            onDelete={onContactDelete}
          />
        </contactsContext.Provider>
      ))}
    </ol>
  );
};

ContactsList.propTypes = {
  bookArray: PropTypes.array,
  filter: PropTypes.string,
  onDelete: PropTypes.func,
};
