var AppDispatcher = require('../dispatchers/app_dispatcher'),
    Constants = require('../constants'),
    ContactuallyLiteClient = require('../clients/contactually_lite_client');

var ContactActions = {

  getContacts : function() {
    ContactuallyLiteClient.get('/contacts/')
      .then(function(response) {
        AppDispatcher.handleAction({
          actionType: Constants.GET_CONTACTS,
          data: response.data
        });
      })
      .catch(function(response) {
        AppDispatcher.handleAction({
          actionType: Constants.ERROR_GETTING_CONTACTS,
          data: response.data
        });
      });
  }

};

module.exports = ContactActions;
