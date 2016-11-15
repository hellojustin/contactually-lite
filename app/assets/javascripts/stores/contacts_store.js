var AppDispatcher = require('../dispatchers/app_dispatcher'),
    Constants     = require('../constants'),
    EventEmitter  = require('events');

var CHANGE_EVENT            = 'change',
    UPLOAD_COMPLETE_EVENT   = 'upload-complete',
    UPLOAD_PROGRESS_EVENT   = 'upload-progress',
    DELETION_COMPLETE_EVENT = 'deletion-complete',
    FETCH_ERROR_EVENT       = 'fetch-error',
    UPLOAD_ERROR_EVENT      = 'upload-error',
    DELETION_ERROR_EVENT    = 'deletion-error',
    SELECTION_CHANGED_EVENT = 'selection-changed';

var contactsStore = Object.assign({}, EventEmitter.prototype, {
  contacts : [],
  selectedContacts : [],
  uploadProgress : {},
  uploadResults: {},

  addChangeListener : function( callback ) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener : function( callback ) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  addUploadCompletionListener : function( callback ) {
    this.on(UPLOAD_COMPLETE_EVENT, callback);
  },
  removeUploadCompletionListener : function( callback ) {
    this.removeListener(UPLOAD_COMPLETE_EVENT, callback);
  },

  addUploadProgressListener : function( callback ) {
    this.on(UPLOAD_PROGRESS_EVENT, callback);
  },
  removeUploadProgressListener : function( callback ) {
    this.removeListener(UPLOAD_PROGRESS_EVENT, callback);
  },

  addDeletionCompletionListener : function( callback ) {
    this.on(DELETION_COMPLETE_EVENT, callback);
  },
  removeDeletionCompletionListener : function( callback ) {
    this.removeListener(DELETION_COMPLETE_EVENT, callback);
  },

  addFetchErrorListener : function( callback ) {
    this.on(FETCH_ERROR_EVENT, callback);
  },
  removeFetchErrorListener : function( callback ) {
    this.removeListener(FETCH_ERROR_EVENT, callback);
  },

  addUploadErrorListener : function( callback ) {
    this.on(UPLOAD_ERROR_EVENT, callback);
  },
  removeUploadErrorListener : function( callback ) {
    this.removeListener(UPLOAD_ERROR_EVENT, callback);
  },

  addDeletionErrorListener : function( callback ) {
    this.on(DELETION_ERROR_EVENT, callback);
  },
  removeDeletionErrorListener : function( callback ) {
    this.removeListener(Deletion_ERROR_EVENT, callback);
  },

  addSelectionChangeListener : function( callback ) {
    this.on(SELECTION_CHANGED_EVENT, callback);
  },
  removeSelectionChangeListener : function( callback ) {
    this.removeListener(SELECTION_CHANGED_EVENT, callback);
  },

  getContacts : function() {
    return this.contacts;
  },
  replaceContacts : function( newContacts ) {
    this.contacts = newContacts;
  },
  getUploadProgress : function() {
    return this.uploadProgress;
  },
  updateUploadProgress : function( progress ) {
    this.uploadProgress = progress;
  },
  getUploadResults : function() {
    return this.uploadResults;
  },
  updateUploadResults : function( results ) {
    this.uploadResults = results;
  },
  setSelected : function( selectedContacts ) {
    if (selectedContacts === 'none' ) { selectedContacts = []; }
    else if (selectedContacts === 'all'  ) {
      selectedContacts = this.contacts.map(function(contact, i) { return i; });
    }
    this.selectedContacts = selectedContacts;
  },
  getSelected : function() {
    return this.selectedContacts;
  }

});

AppDispatcher.register( function( payload ) {
  var action = payload.action;
  switch ( action.actionType ) {
    case Constants.GET_CONTACTS:
      contactsStore.replaceContacts( action.data );
      contactsStore.emit( CHANGE_EVENT );
      break;
    case Constants.CONTACTS_UPLOADED:
      contactsStore.updateUploadProgress( {} );
      contactsStore.updateUploadResults( action.data );
      contactsStore.emit( UPLOAD_COMPLETE_EVENT );
      break;
    case Constants.CONTACTS_UPLOAD_PROGRESS:
      contactsStore.updateUploadProgress( action.data );
      contactsStore.emit( UPLOAD_PROGRESS_EVENT );
      break;
    case Constants.CONTACTS_DELETED:
      contactsStore.setSelected( [] );
      contactsStore.emit( DELETION_COMPLETE_EVENT );
      break;
    case Constants.ERROR_GETTING_CONTACTS:
      contactsStore.emit( FETCH_ERROR_EVENT );
      break;
    case Constants.ERROR_UPLOADING_CONTACTS:
      contactsStore.emit( UPLOAD_ERROR_EVENT );
      break;
    case Constants.ERROR_DELETING_CONTACTS:
      contactsStore.emit( DELETION_ERROR_EVENT );
      break;
    case Constants.CONTACTS_SELECTED:
      contactsStore.setSelected( action.data );
      contactsStore.emit( SELECTION_CHANGED_EVENT );
      break;
    default:
      return true;
  }
});

module.exports = contactsStore;
