var React          = require('react'),
    mui            = require('material-ui'),
    Checkbox       = mui.Checkbox,
    ContactActions = require('../actions/contact_actions');

var FilterByEmailControls = React.createClass({

  filterComEmailAddresses : function( contact ) {
    return contact.email_address.match( /\.com$/ );
  },

  onOnlyComToggle : function( event, isChecked ) {
    if (isChecked) {
      ContactActions.addFilter( this.filterComEmailAddresses );
    } else {
      ContactActions.removeFilter( this.filterComEmailAddresses );
    }
  },

  render : function() {
    return (
      <div id='filterByEmailControls'>
        <div className='group-label'>
          Filter Email Addresses
        </div>
        <Checkbox
          label="Show only '.com' addresses"
          onCheck={this.onOnlyComToggle}/>
      </div>
    );
  }

});

module.exports = FilterByEmailControls;
