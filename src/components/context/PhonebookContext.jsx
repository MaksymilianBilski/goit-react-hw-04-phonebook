import { useContext, createContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export const PhonebookContext = createContext();
export const usePhonebookContext = () => useContext(PhonebookContext);

const PhonebookProvider = ({ children }) => {
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
    setContacts(deletedContacts);
    localStorage.setItem('contacts', JSON.stringify(deletedContacts));
  };

  return (
    <PhonebookContext.Provider
      value={{
        onContactDelete,
        onFilterChange,
        onFormSubmit,
        filter,
        contacts,
      }}
    >
      {children}
    </PhonebookContext.Provider>
  );
};

export default PhonebookProvider;
