var axios = require('axios');

var ContactuallyClient = axios.create({
  baseUrl : '/'
});

module.exports = ContactuallyClient;
