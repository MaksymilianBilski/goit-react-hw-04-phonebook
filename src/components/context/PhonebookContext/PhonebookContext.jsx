import { useContext, createContext } from 'react';

export const PhonebookContext = createContext();
export const usePhonebookContext = () => useContext(PhonebookContext);
