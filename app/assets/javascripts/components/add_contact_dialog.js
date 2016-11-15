var React          = require('react'),
    mui            = require('material-ui'),
    Dialog         = mui.Dialog,
    LinearProgress = mui.LinearProgress,
    ContactActions = require('../actions/contact_actions');

var AddContactDialog = React.createClass({

  getInitialState : function() {
    return {
      open : this.props.open,
      uploadProgress : 0
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
    this.attachJQueryBindings();
  },

  componentWillUnmount : function() {
    this.props.contactsStore.removeUploadCompletionListener(
        this.handleFileUploadCompletion);
    this.props.contactsStore.removeUploadProgressListener(
      this.handleFileUploadProgress);
    this.props.contactsStore.removeUploadErrorListener(
      this.handleFileUploadError);
  },

  attachJQueryBindings : function() {
    $('.add-contact-dialog').on('dragenter', '.upload-target', function(e) {
      var $uploadTarget = $(e.target).parent('.upload-target');
      $uploadTarget.find('.upload-target-bg').addClass('file-hovering');
    });
    $('.add-contact-dialog').on('dragleave', '.upload-target', function(e) {
      var $uploadTarget = $(e.target).parent('.upload-target');
      $uploadTarget.find('.upload-target-bg').removeClass('file-hovering');
    });
  },

  handleFileUploadCompletion : function() {
    console.log("Woohoo! Upload Comploete");
    ContactActions.getContacts();
    this.props.onRequestClose();
  },

  handleFileUploadProgress : function() {
    var progress = this.props.contactsStore.getUploadProgress();
    this.setState({uploadProgress: progress.loaded / progress.total * 100 });
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
        className="add-contact-dialog"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}>
        Drag a file on the area below to upload it.

        <form>
          <div className='upload-target'>
            <div className='upload-target-bg'>
              <div className='upload-target-message'>Drop file here!</div>
            </div>
            <input
              type='file'
              id='fileUpload'
              className='upload-target-field'
              onChange={this.handleFileSelectionChanged}/>
          </div>
        </form>

        <LinearProgress
          className='upload-progress-bar'
          mode="determinate"
          style={{marginTop: '1rem'}}
          value={this.state.uploadProgress} />

      </Dialog>
    );
  }

});

module.exports = AddContactDialog
