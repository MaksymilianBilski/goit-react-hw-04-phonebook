import PropTypes from 'prop-types';
import { AddContacts } from './Form/Form';
import { Section } from './Section/Section';
import { SearchForm } from './SearchByName/SearchForm';
import { ContactsList } from './ContactsList/ContactsList';
import {
  PhonebookContext,
  usePhonebookContext,
} from './context/PhonebookContext';
import PhonebookProvider from './context/PhonebookContext';

export const App = () => {
  const { contacts } = usePhonebookContext();
  return (
    <div>
      <PhonebookProvider>
        <Section title="Phonebook">
          <AddContacts />
        </Section>
        <SearchForm />
        {contacts !== undefined ? <ContactsList /> : <></>}
      </PhonebookProvider>
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
