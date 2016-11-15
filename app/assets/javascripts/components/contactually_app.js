var React                = require('react'),
    mui                  = require('material-ui'),
    AppBar               = mui.AppBar,
    Snackbar             = mui.Snackbar,
    FloatingActionButton = mui.FloatingActionButton,
    ContentAdd           = require('material-ui/svg-icons/content/add').default,
    ContactsTable        = require('./contacts_table'),
    AddContactDialog     = require('./add_contact_dialog'),
    ContactsStore        = require('../stores/contacts_store'),
    ContactActions       = require('../actions/contact_actions');

var ContactuallyApp = React.createClass({
  getInitialState : function() {
    return {
      addContactDialogOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      snackbarAutohideTimeout: 3000,
      contacts: []
    };
  },

  componentDidMount : function() {
    ContactActions.getContacts();
  },

  setSnackbarMessage : function( newMessage ) {
    this.setState({
      snackbarMessage : newMessage,
      snackbarOpen : true
    });
  },

  closeSnackbar : function() {
    this.setState({ snackbarOpen : false });
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
          contactsStore={ContactsStore}
          setSnackbarMessage={this.setSnackbarMessage}/>
        <AppBar title='Contactually Lite'></AppBar>
        <ContactsTable contactsStore={ContactsStore}></ContactsTable>
        <div className='buttons'>
          <FloatingActionButton
            className='add-contact button'
            onClick={this.openAddContactDialog}>
            <ContentAdd/>
          </FloatingActionButton>
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          action="dismiss"
          autoHideDuration={this.state.snackbarAutohideTimeout}
          onActionTouchTap={this.closeSnackbar}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
});

module.exports = ContactuallyApp;
