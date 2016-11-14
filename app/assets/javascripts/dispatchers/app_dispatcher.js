var Dispatcher = require('flux');

var AppDispatcher = new Dispatcher.Dispatcher();

AppDispatcher.handleAction = function( action ) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher
