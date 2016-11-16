var React = require('react'),
    sinon = require('sinon'),
    StringFormatter = require('../../../app/assets/javascripts/util/string_formatter');

describe('StringFormatter', function() {

  describe('#phoneNumber', function() {

    it('formats a basic 10-digit phone number', function() {
      var result = StringFormatter.phoneNumber('5184827565');
      expect(result).to.equal('(518) 482-7565');
    });

    it('formats a 10-digit phone number with country code', function() {
      var result = StringFormatter.phoneNumber('3535184827565');
      expect(result).to.equal('+353 (518) 482-7565');
    });

    it('formats a 10-digit phone number with an extension', function() {
      var result = StringFormatter.phoneNumber('5184827565x123');
      expect(result).to.equal('(518) 482-7565 x123');
    });

    it('formats a 10-digit phone number with a long extension', function() {
      var result = StringFormatter.phoneNumber('5184827565x5184827565');
      expect(result).to.equal('(518) 482-7565 x5184827565');
    });

    it('formats a phone number with country code and extension', function() {
      var result = StringFormatter.phoneNumber('15184827565x123');
      expect(result).to.equal('+1 (518) 482-7565 x123');
    });

  });

});
