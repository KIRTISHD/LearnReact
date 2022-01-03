import React from 'react';
//we add {} only to those which are not export default; export default ones do not need {}
import {Link} from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    //Tip: write function above the point where it is used.
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return(
                <ContactCard contact={contact} clickHandler = {deleteContactHandler} key={ contact.id }/>
        );
    });

    return (
        <div class="main">
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui celled list">
                {renderContactList}
            </div>
        </div>
    )
}

export default ContactList;
