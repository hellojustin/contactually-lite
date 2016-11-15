var React                = require('react'),
    mui                  = require('material-ui'),
    AppBar               = mui.AppBar,
    FloatingActionButton = require('material-ui/FloatingActionButton').default,
    ContentAdd           = require('material-ui/svg-icons/content/add').default,
    ContactsTable        = require('./contacts_table'),
    AddContactDialog     = require('./add_contact_dialog'),
    ContactsStore        = require('../stores/contacts_store'),
    ContactActions       = require('../actions/contact_actions');

var ContactuallyApp = React.createClass({
  getInitialState : function() {
    return {
      addContactDialogOpen: false,
      contacts: []
    };
  },

  componentDidMount : function() {
    ContactActions.getContacts();
  },

  openAddContactDialog : function() {
    this.setState({ addContactDialogOpen : true });
  },

  closeAddContactDialog : function() {
    this.setState({ addContactDialogOpen : false });
  },

  render: function() {
    return (
      <div id='themedComponents'>
        <AddContactDialog
          open={this.state.addContactDialogOpen}
          onRequestClose={this.closeAddContactDialog}
          contactsStore={ContactsStore}/>
        <AppBar title='Contactually Lite'></AppBar>
        <ContactsTable contactsStore={ContactsStore}></ContactsTable>
        <div className='buttons'>
          <FloatingActionButton
            className='add-contact button'
            onClick={this.openAddContactDialog}>
            <ContentAdd/>
          </FloatingActionButton>
        </div>
      </div>
    );
  }
});

module.exports = ContactuallyApp;
