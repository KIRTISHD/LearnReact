import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import api from '../api/contacts';
import EditContact from './EditContact';

function App() {
  // [] in useState indicates initial value for contacts array
  const [contacts, setContacts] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrievedContacts = async() => {
     const response = await api.get("/contacts");
     return response.data;
   };

  const addContactHandler = async(contact) => {
    //use a function to add object in array and not directly to array
    const request = {
      id: uuidv4(),
      ...contact
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  }

  const removeContactHandler = async(id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  const updateContactHandler = async(contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email} = response.data;
    setContacts(contacts.map(contact => {
      return contact.id === id ? {...response.data} : contact;
    }));
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    // const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrievedContacts) setContacts(retrievedContacts);
    const getAllContacts = async() => {
      const AllContacts = await retrievedContacts();
      if (AllContacts) setContacts(AllContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          {/* Normal way to use; if there are no props
          <Route
            path="/"
            exact
            component={ContactList} /> */}
          {/* Another way is using anonymous function, but this create componenet everytime we call it, hence performance issue
          <Route
          path="/"
          exact
          component={() => <ContactList contacts={contacts} getContactId={removeContactHandler}/>} /> */}
           <Route
          path="/"
          exact
          render={(props) => (
            <ContactList {...props} contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler}/>
          )} />
          <Route
            path="/add"
            render={(props) => (<AddContact {...props} addContactHandler={addContactHandler}/>)} />
          <Route
            path="/edit"
            render={(props) => (<EditContact {...props} updateContactHandler={updateContactHandler}/>)} />
          <Route
            path="/contact/:id"
            component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
