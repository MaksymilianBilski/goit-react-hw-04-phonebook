import { usePhonebookContext } from '../context/PhonebookContext';
import css from './ContactListItem.module.css';

export const ContactListItem = ({ contact }) => {
  const { name, id, number } = contact;
  const { onContactDelete } = usePhonebookContext();
  return (
    <>
      <li className={css.listItem}>
        {' '}
        {name}: {number}
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
