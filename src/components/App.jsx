import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AddContacts } from './Form/Form';
import { Section } from './Section/Section';
import { SearchForm } from './SearchByName/SearchForm';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { PhonebookContext } from './context/PhonebookContext/PhonebookContext';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem('contacts')) === undefined ||
      JSON.parse(localStorage.getItem('contacts')) === null
    ) {
      return;
    }
    const localUsers = JSON.parse(localStorage.getItem('contacts'));
    setContacts([...localUsers]);
  }, []);

  const onFormSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name;
    const number = form.elements.number;
    if (
      contacts.find(
        contact =>
          contact.name === name.value && contact.number === number.value
      )
    ) {
      alert(`${name.value} is already in contacts`);
      return;
    }

    const contact = {
      name: name.value,
      number: number.value,
      id: nanoid(),
    };
    //add single contact to local storage
    const newContacts = [...contacts, contact];
    setContacts([...newContacts]);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
    form.reset();
  };

  const onFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const onContactDelete = id => {
    const deletedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('deletedContacts', JSON.stringify(deletedContacts));
    setContacts(deletedContacts);
    localStorage.setItem('contacts', JSON.stringify(deletedContacts));
  };

  return (
    <div>
      <PhonebookContext.Provider
        value={{
          contacts,
          filter,
          onFilterChange,
          onContactDelete,
          onFormSubmit,
        }}
      >
        <Section title="Phonebook">
          <AddContacts />
        </Section>
        <SearchForm />
        {contacts !== undefined ? <ContactsList /> : <></>}
      </PhonebookContext.Provider>
    </div>
  );
};

PhonebookContext.Provider.propTypes = {
  value: PropTypes.shape({
    contacts: PropTypes.array,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    onContactDelete: PropTypes.func,
    onFormSubmit: PropTypes.func,
  }),
};
