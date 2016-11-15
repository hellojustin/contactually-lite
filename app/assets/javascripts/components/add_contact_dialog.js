var React          = require('react'),
    mui            = require('material-ui'),
    Dialog         = mui.Dialog,
    ContactActions = require('../actions/contact_actions');

var AddContactDialog = React.createClass({

  getInitialState : function() {
    return {
      open : this.props.open
    }
  },

  propTypes : {
    open : React.PropTypes.bool,
    onRequestClose : React.PropTypes.func
  },

  componentDidMount : function() {
    this.props.contactsStore.addUploadCompletionListener(
        this.handleFileUploadCompletion);
    this.props.contactsStore.addUploadProgressListener(
      this.handleFileUploadProgress);
    this.props.contactsStore.addUploadErrorListener(
      this.handleFileUploadError);
  },

  componentWillUnmount : function() {
    this.props.contactsStore.removeUploadCompletionListener(
        this.handleFileUploadCompletion);
    this.props.contactsStore.removeUploadProgressListener(
      this.handleFileUploadProgress);
    this.props.contactsStore.removeUploadErrorListener(
      this.handleFileUploadError);
  },

  handleFileUploadCompletion : function() {
    console.log("Woohoo! Upload Comploete");
    ContactActions.getContacts();
    this.props.onRequestClose();
  },

  handleFileUploadProgress : function() {
    var progress = this.props.contactsStore.getUploadProgress();
    console.log("Uploaded " + progress.loaded + " of " + progress.total);
  },

  handleFileUploadError : function() {
    console.log("There was an error during the file upload process.");
  },

  handleFileSelectionChanged : function(event) {
    var file = event.target.files[0];
    ContactActions.uploadContacts(file);
  },

  render : function() {
    var actions = [];
    return (
      <Dialog
        title="Add Contacts"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}>
        Drag a file on the area below to upload it.

        <form>
          <input
            type='file'
            id='fileUpload'
            onChange={this.handleFileSelectionChanged}/>
        </form>

      </Dialog>
    );
  }

});

module.exports = AddContactDialog
