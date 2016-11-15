var AppDispatcher = require('../dispatchers/app_dispatcher'),
    Constants     = require('../constants'),
    EventEmitter  = require('events');

var CHANGE_EVENT          = 'change',
    UPLOAD_COMPLETE_EVENT = 'upload-complete',
    UPLOAD_PROGRESS_EVENT = 'upload-progress',
    FETCH_ERROR_EVENT     = 'fetch-error',
    UPLOAD_ERROR_EVENT    = 'upload-error';

var contactsStore = Object.assign({}, EventEmitter.prototype, {
  contacts : [],
  uploadProgress : {},

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

  addFetchErrorListener : function( callback ) {
    this.on(FETCH_ERROR_EVENT, callback);
  },
  removeFetchErrorListener : function( callback ) {
    this.removeListener(FETCH_ERROR_EVENT, callback);
  },

  addUploadErrorListener : function( callback ) {
    this.on(UPLOAD_ERROR_EVENT, callback);
  },
  removeUploadErrorListner : function( callback ) {
    this.removeListener(UPLOAD_ERROR_EVENT, callback);
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
      contactsStore.emit( UPLOAD_COMPLETE_EVENT );
      break;
    case Constants.CONTACTS_UPLOAD_PROGRESS:
      contactsStore.updateUploadProgress( action.data );
      contactsStore.emit( UPLOAD_PROGRESS_EVENT );
      break;
    case Constants.ERROR_GETTING_CONTACTS:
      contactsStore.emit( FETCH_ERROR_EVENT );
      break;
    case Constants.ERROR_UPLOADING_CONTACTS:
      contactsStore.emit( UPLOAD_ERROR_EVENT );
      break;
    default:
      return true;
  }
});

module.exports = contactsStore;
