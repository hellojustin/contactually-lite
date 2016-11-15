var axios = require('axios'),
    Csrf  = require('../util/csrf');

var ContactuallyClient = axios.create({
  baseUrl : '/',
  headers : {
    'X-CSRF-Token' : Csrf.getToken()
  }
});

module.exports = ContactuallyClient;
