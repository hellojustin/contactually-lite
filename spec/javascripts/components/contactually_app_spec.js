var React = require('react'),
    ContactuallyApp = require('../../../app/assets/javascripts/components/contactually_app');


describe('ContactuallyApp', function() {

  it('accepts a contacts array parameter', function() {
    ContactuallyApp.propTypes.contacts.should.equal( React.PropTypes.array );
  });

});
