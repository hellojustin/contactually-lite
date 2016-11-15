var React                 = require('react'),
    mui                   = require('material-ui'),
    AppBar                = mui.AppBar,
    Snackbar              = mui.Snackbar,
    FloatingActionButton  = mui.FloatingActionButton,
    ContentAdd            = require('material-ui/svg-icons/content/add').default,
    ContentRemove         = require('material-ui/svg-icons/content/remove').default,
    ContactsTable         = require('./contacts_table'),
    AddContactDialog      = require('./add_contact_dialog'),
    ContactsStore         = require('../stores/contacts_store'),
    ContactActions        = require('../actions/contact_actions');

var ContactuallyApp = React.createClass({
  getInitialState : function() {
    return {
      addContactDialogOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      snackbarAutohideTimeout: 3000,
      contacts: ContactsStore.getContacts(),
      selectedContacts : ContactsStore.getSelected()
    };
  },

  componentDidMount : function() {
    ContactActions.getContacts();
    ContactsStore.addChangeListener( this.onContactsChange );
    ContactsStore.addSelectionChangeListener( this.onSelectionChange );
    ContactsStore.addDeletionCompletionListener( this.onDeleteComplete );
  },

  componentWillUnmount : function() {
    ContactsStore.removeChangeListener( this.onContactsChange );
    ContactsStore.removeSelectionChangeListener( this.onSelectionChange );
    ContactsStore.removeDeletionCompletionListener( this.onDeleteComplete );
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

  onContactsChange : function() {
    this.setState({
      contacts : ContactsStore.getContacts(),
      selectedContacts : ContactsStore.getSelected()
    });
  },

  onSelectionChange : function() {
    this.setState({ selectedContacts : ContactsStore.getSelected() });
  },

  onDeleteComplete : function() {
    ContactActions.getContacts();
  },

  deleteSelectedContacts : function() {
    var idsToDelete = this.state.selectedContacts.map(function(rowNum) {
      return this.state.contacts[rowNum].id;
    }.bind(this));
    ContactActions.deleteContacts(idsToDelete);
  },

  render: function() {
    var removeButtonStyles = { display : 'none'};
    if (this.state.selectedContacts.length > 0) {
      removeButtonStyles = { display : 'block'}
    }
    return (
      <div id='themedComponents'>
        <AddContactDialog
          open={this.state.addContactDialogOpen}
          onRequestClose={this.closeAddContactDialog}
          contactsStore={ContactsStore}
          setSnackbarMessage={this.setSnackbarMessage}/>
        <AppBar
          title='Contactually Lite'
          iconElementLeft={<div></div>}>
        </AppBar>
        <ContactsTable contactsStore={ContactsStore}></ContactsTable>
        <div className='buttons'>
          <FloatingActionButton
            className='remove-contact button'
            onClick={this.deleteSelectedContacts}
            secondary={true}
            style={removeButtonStyles}>
            <ContentRemove/>
          </FloatingActionButton>
          <FloatingActionButton
            className='add-contact button'
            onClick={this.openAddContactDialog}
            style={{display: 'block'}}>
            <ContentAdd/>
          </FloatingActionButton>
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          action="dismiss"
          autoHideDuration={this.state.snackbarAutohideTimeout}
          onActionTouchTap={this.closeSnackbar}
          onRequestClose={this.closeSnackbar} />
      </div>
    );
  }
});

module.exports = ContactuallyApp;
