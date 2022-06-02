import styles from './ContactList.module.css';
import ContactListItem from './ContactListItem';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDelClick }) => {
  if (contacts.length === 0) {
    return <p className={styles.emptyFilter}>No contact with this name</p>;
  }
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.item}>
          <ContactListItem
            id={contact.id}
            name={contact.name}
            number={contact.number}
            onClick={onDelClick}
          />
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};

export default ContactList;
