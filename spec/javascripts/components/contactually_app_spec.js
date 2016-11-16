var React = require('react'),
    sinon = require('sinon'),
    ContactsStore = require('../../../app/assets/javascripts/stores/contacts_store'),
    ContactuallyApp = require('../../../app/assets/javascripts/components/contactually_app');


describe('ContactuallyApp', function() {
  var contactsStub, selectedStub, app;

  before(function() {
    contactsStub = sinon.stub(ContactsStore, 'getContacts').returns(1),
    selectedStub = sinon.stub(ContactsStore, 'getSelected').returns(2),
    app = new ContactuallyApp();
  });

  it('starts with the addContactDialog closed', function() {
    var addContactDialogOpen = app.getInitialState().addContactDialogOpen;
    expect(addContactDialogOpen).to.be.false;
  });

  it('starts with the snackbar closed', function() {
    var snackbarOpen = app.getInitialState().snackbarOpen;
    expect(snackbarOpen).to.be.false;
  });

  it('starts with an empty snackbar message', function() {
    var snackbarMessage = app.getInitialState().snackbarMessage;
    expect(snackbarMessage).to.equal('');
  });

  it('will automatically close snackbar 3 seconds after it opens', function() {
    var snackbarAutohideTimeout = app.getInitialState().snackbarAutohideTimeout;
    expect(snackbarAutohideTimeout).to.equal(3000);
  });

  it('starts with the contacts available in ContactsStore', function() {
    var contacts = app.getInitialState().contacts;
    expect(contacts).to.equal(1);
  });

  it('starts with the selectedContacts available in ContactsStore', function() {
    var selectedContacts = app.getInitialState().selectedContacts;
    expect(selectedContacts).to.equal(2);
  });

});
