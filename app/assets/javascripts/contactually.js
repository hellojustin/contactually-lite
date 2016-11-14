var React                = require('react'),
    ReactDOM             = require('react-dom'),
    Theme                = require('./theme'),
    MuiThemeProvider     = require('material-ui/styles/MuiThemeProvider').default,
    ContactuallyApp      = require('components/contactually_app'),
    injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

$(function(){
  ReactDOM.render(
    <MuiThemeProvider muiTheme={Theme}>
      <ContactuallyApp/>
    </MuiThemeProvider>,
    document.getElementById('ContactuallyApp')
  );
});
