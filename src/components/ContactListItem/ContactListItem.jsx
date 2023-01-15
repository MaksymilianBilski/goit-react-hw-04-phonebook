import { useContactsContext } from 'components/context/ContactsContext/ContactsContext';
import { usePhonebookContext } from '../context/PhonebookContext/PhonebookContext';
import css from './ContactListItem.module.css';

export const ContactListItem = () => {
  const { name, number, id } = useContactsContext();
  const { onContactDelete } = usePhonebookContext();
  return (
    <>
      <li className={css.listItem}>
        {' '}
        {name}: {number}{' '}
        <button
          className={css.button}
          type="button"
          onClick={() => onContactDelete(id)}
        >
          DELETE
        </button>
      </li>{' '}
    </>
  );
};

