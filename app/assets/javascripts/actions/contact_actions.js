var AppDispatcher = require('../dispatchers/app_dispatcher'),
    Constants = require('../constants'),
    ContactuallyLiteClient = require('../clients/contactually_lite_client');

var ContactActions = {

  getContacts : function() {
    ContactuallyLiteClient.get('/contacts')
      .then(function(response) {
        AppDispatcher.handleAction({
          actionType : Constants.GET_CONTACTS,
          data       : response.data
        });
      })
      .catch(function(response) {
        AppDispatcher.handleAction({
          actionType : Constants.ERROR_GETTING_CONTACTS,
          data       : response.data
        });
      });
  },

  uploadContacts : function(file) {
    var data = new FormData(),
        config;
    data.append('upload', file);

    config = {
      onUploadProgress : function(progressEvent) {
        AppDispatcher.handleAction({
          actionType : Constants.CONTACTS_UPLOAD_PROGRESS,
          data       : progressEvent
        });
      }
    };

    ContactuallyLiteClient.post('/contact_collections', data, config)
      .then(function(response) {
        AppDispatcher.handleAction({
          actionType : Constants.CONTACTS_UPLOADED,
          data       : response.data
        });
      })
      // .catch(function(response) {
      //   AppDispatcher.handleAction({
      //     actionType : Constants.ERROR_UPLOADING_CONTACTS,
      //     data       : response.data
      //   });
      // });
  }

};

module.exports = ContactActions;
