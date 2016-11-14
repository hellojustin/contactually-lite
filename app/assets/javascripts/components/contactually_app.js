var React            = require('react'),
    mui              = require('material-ui'),
    AppBar           = mui.AppBar,
    ContactsTable    = require('./contacts_table'),
    ContactsStore    = require('../stores/contacts_store'),
    ContactActions   = require('../actions/contact_actions');

var ContactuallyApp = React.createClass({
  getInitialState : function() {
    return {
      contacts: []
    };
  },

  componentDidMount : function() {
    ContactActions.getContacts();
  },

  getContacts : function() {
    return this.state.contacts;
  },

  render: function() {
    return (
      <div id='themedComponents'>
        <AppBar title='Contactually Lite'></AppBar>
        <ContactsTable contactsStore={ContactsStore}></ContactsTable>
      </div>
    );
  }
});

module.exports = ContactuallyApp;
