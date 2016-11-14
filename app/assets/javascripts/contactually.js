var React = require('react'),
    ReactDOM = require('react-dom'),
    ContactuallyApp = require('components/contactually_app');

$(function(){
  ReactDOM.render(
    <div><ContactuallyApp label="hello" /></div>,
    document.getElementById('ContactuallyApp')
  );
});
