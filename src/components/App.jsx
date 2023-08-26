import { useState } from 'react';
import { PhoneForm } from './Phonebook/PhoneForm';
import { FormList } from './Phonebook/FormList.jsx';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactFilter, setContactFilter] = useState('');

  const changeContactFilter = newFilter => {
    setContactFilter(newFilter);
  };

  const addItem = newItem => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newItem.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${newItem.name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: newItem.name,
      number: newItem.number,
    };
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContactItems = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactFilter.toLowerCase())
  );

  return (
    <div>
      <PhoneForm onAdd={addItem} />
      <FormList
        contacts={visibleContactItems}
        contactFilter={contactFilter}
        onChangeFilter={changeContactFilter}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export const ContactFilter = ({ value, onChange }) => {
  return (
    <div>
      <h2>Find contacts by name</h2>
      <input
        type="text"
        value={value}
        onChange={evt => onChange(evt.target.value)}
      ></input>
    </div>
  );
};
