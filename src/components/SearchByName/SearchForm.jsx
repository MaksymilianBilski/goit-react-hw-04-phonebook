import { useAppContext } from 'components/App';
import css from './SearchForm.module.css';
import PropTypes from 'prop-types';

export const SearchForm = () => {
  const { filter, onFilterChange } = useAppContext();
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

SearchForm.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
