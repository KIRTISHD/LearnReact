import React, {useState} from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  // [] in useState indicates initial value for contacts array
  const [contacts, setContacts] = useState([]);


  const addContactHandler = (contact) => {
    //use a function to add object in array and not directly to array
    setContacts([...contacts, contact]);
  }

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts}/>
    </div>
  );
}

export default App;
