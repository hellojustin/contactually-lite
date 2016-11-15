var React            = require('react'),
    mui              = require('material-ui'),
    RadioButton      = mui.RadioButton,
    RadioButtonGroup = mui.RadioButtonGroup,
    ContactActions   = require('../actions/contact_actions');

var SortByEmailControls = React.createClass({

  sortingSelectionChanged : function( event, value ) {
    if ( value === 'asc' ) {
      ContactActions.setSortingFunction( function( a, b ) {
        return a.email_address.localeCompare(b.email_address);
      })
    } else if ( value === 'desc' ) {
      ContactActions.setSortingFunction( function( a, b ) {
        return b.email_address.localeCompare(a.email_address);
      })
    }
  },

  render : function() {
    return (
      <div id='sortByEmailControls'>
        <div className='group-label'>
          Sort by Email Address
        </div>
        <RadioButtonGroup
          name="sort_by_email"
          onChange={this.sortingSelectionChanged}>
          <RadioButton
            value="asc"
            label="Ascending (A-Z)"/>
          <RadioButton
            value="desc"
            label="Descending (Z-A)"/>
        </RadioButtonGroup>
      </div>
    );
  }

});

module.exports = SortByEmailControls;
