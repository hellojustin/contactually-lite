var React  = require('react'),
    mui    = require('material-ui'),
    AppBar = mui.AppBar;

// Define this in the global space, so that the Rails react helpers can find it.
var ContactuallyApp = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array
  },

  render: function() {
    return (
      <AppBar
        title='Contactually'>
      </AppBar>
    );
  }
});

module.exports = ContactuallyApp
