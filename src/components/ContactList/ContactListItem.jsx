import styles from './ContactListItem.module.css';
import { ReactComponent as DelBtn } from '../../icons/del.svg';
import PropTypes from 'prop-types';
const ContactListItem = ({ id, name, number, onClick }) => {
  return (
    <>
      <p className={styles.text}>
        <span className={styles.text__name}>{name}:</span> {number}
      </p>
      <button
        className={styles.delBtn}
        onClick={() => onClick(id)}
        type="button"
      >
        Delete
        <DelBtn className={styles.delBtnIcon} />
      </button>
    </>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  onClick: PropTypes.func,
};

export default ContactListItem;
