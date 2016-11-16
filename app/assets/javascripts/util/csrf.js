var $ = require('jquery');

var Csrf = {
  getToken : function() {
    return $('meta[name="csrf-token"]').attr('content');
  }
}

module.exports = Csrf;
