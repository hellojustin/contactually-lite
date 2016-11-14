var React          = require('react'),
    mui            = require('material-ui'),
    TableRow       = mui.TableRow,
    TableRowColumn = mui.TableRowColumn;

var ContactRow = React.createClass({

  propTypes : {
    contactId  : React.PropTypes.number.isRequired,
    getContact : React.PropTypes.func.isRequired
  },

  getInitialState : function() {
    return this.props.getContact(this.props.contactId);
  },

  render : function() {
    return (
      <TableRow
        key={this.state.id}
        selected={this.state.selected}
        hoverable={this.props.hoverable}
        onCellClick={this.props.onCellClick}
        onCellHover={this.props.onCellHover}
        onCellHoverExit={this.props.onCellHoverExit}
        onRowClick={this.props.onRowClick}
        onRowHover={this.props.onRowHover}
        onRowHoverExit={this.props.onRowHoverExit}
        rowNumber={this.props.rowNumber}
        striped={this.props.striped}>
        {this.props.children[0]}

        <TableRowColumn key={1}>{this.state.first_name}</TableRowColumn>
        <TableRowColumn key={2}>{this.state.last_name}</TableRowColumn>
        <TableRowColumn key={3}>{this.state.phone_number}</TableRowColumn>
        <TableRowColumn key={4}>{this.state.email_address}</TableRowColumn>
        <TableRowColumn key={5}>{this.state.company_name}</TableRowColumn>

      </TableRow>
    );
  }

});

module.exports = ContactRow
