import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = props => (
  <>
    <label htmlFor="name" className={styles.label}>
      Find contact by name:
    </label>
    <input
      className={styles.input}
      onChange={props.onChange}
      value={props.value}
      type="text"
      name="name"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
    />
  </>
);

Filter.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;
