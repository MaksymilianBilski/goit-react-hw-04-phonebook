import { useContactsContext } from 'components/ContactsList/ContactsList';
import { useAppContext } from 'components/App';
import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = () => {
  const { name, number, id } = useContactsContext();
  const { onContactDelete } = useAppContext();
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

ContactListItem.propTypes = {
  contact: PropTypes.object,
  onDelete: PropTypes.func,
};
