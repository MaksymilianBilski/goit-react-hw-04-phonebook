import { AddContacts } from './Form/Form';
import { Section } from './Section/Section';
import { SearchForm } from './SearchByName/SearchForm';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { useEffect, useState, useContext, createContext } from 'react';

export const appContext = createContext();
export const useAppContext = () => useContext(appContext);

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
    setContacts(contacts.filter(contact => contact.id !== id));
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  return (
    <div>
      <appContext.Provider
        value={{
          contacts,
          filter,
          onFilterChange,
          onContactDelete,
          onFormSubmit,
        }}
      >
        <Section title="Phonebook">
          <AddContacts onSubmit={onFormSubmit} />
        </Section>
        <SearchForm value={filter} onChange={onFilterChange} />
        {contacts !== undefined ? (
          <ContactsList
            bookArray={contacts}
            filter={filter}
            onDelete={onContactDelete}
          />
        ) : (
          <></>
        )}
      </appContext.Provider>
    </div>
  );
};
