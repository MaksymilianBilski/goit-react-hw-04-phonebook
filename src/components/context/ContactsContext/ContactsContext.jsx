import { createContext, useContext } from 'react';

export const ContactsContext = createContext();
export const useContactsContext = () => useContext(ContactsContext);

const ContactsProvider = ({ children, value }) => {
  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
