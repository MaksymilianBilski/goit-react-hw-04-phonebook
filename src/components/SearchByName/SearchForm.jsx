import { usePhonebookContext } from '../context/PhonebookContext';
import css from './SearchForm.module.css';

export const SearchForm = () => {
  const { filter, onFilterChange } = usePhonebookContext();
  return (
    <label className={css.label}>
      Find contacts by name:
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={onFilterChange}
      />
    </label>
  );
};
