var StringFormatter = {
  phoneNumber : function( phoneNumber ) {
    var regex = /(\d*)(\d{3})(\d{3})(\d{4})(x\d+)?/,
        formatted = phoneNumber.replace(regex, '$1 ($2) $3-$4 $5').trim();
    if (formatted[0] !== '(') { formatted = '+' + formatted; }
    return formatted;
  }
};

module.exports = StringFormatter;
