var AppDispatcher = require('../dispatchers/app_dispatcher'),
    Constants     = require('../constants'),
    EventEmitter  = require('events');

var CHANGE_EVENT = 'change',
    ERROR_EVENT  = 'error';

var contactsStore = Object.assign({}, EventEmitter.prototype, {
  contacts : [],

  addChangeListener : function( callback ) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener : function( callback ) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  addErrorListener : function( callback ) {
    this.on(ERROR_EVENT, callback);
  },
  removeErrorListener : function( callback ) {
    this.removeListener(ERROR_EVENT, callback);
  },
  getContacts : function() {
    return this.contacts;
  },
  replaceContacts : function( newContacts ) {
    this.contacts = newContacts;
  }
});

AppDispatcher.register( function( payload ) {
  var action = payload.action;
  switch ( action.actionType ) {
    case Constants.GET_CONTACTS:
      contactsStore.replaceContacts( action.data );
      contactsStore.emit( CHANGE_EVENT );
      break;
    case Constants.ERROR_GETTING_CONTACTS:
      contactsStore.emit( ERROR_EVENT );
      break;
    default:
      return true;
  }
});

module.exports = contactsStore;
