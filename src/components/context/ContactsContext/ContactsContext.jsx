import { createContext, useContext } from 'react';

export const ContactsContext = createContext();
export const useContactsContext = () => useContext(ContactsContext);
