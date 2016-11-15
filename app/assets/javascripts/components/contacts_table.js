var React                 = require('react'),
    mui                   = require('material-ui'),
    Table                 = mui.Table,
    TableRow              = mui.TableRow,
    TableBody             = mui.TableBody,
    TableHeader           = mui.TableHeader,
    TableHeaderColumn     = mui.TableHeaderColumn,
    TableRowColumn        = mui.TableRowColumn,
    ContactActions        = require('../actions/contact_actions'),
    FilterByEmailControls = require('./filter_by_email_controls'),
    SortByEmailControls   = require('./sort_by_email_controls');

var ContactsTable = React.createClass({

  propTypes : {
    contactsStore: React.PropTypes.object.isRequired
  },

  getInitialState : function() {
    return {
      contacts: this.props.contactsStore.getContacts(),
      selectedContacts: this.props.contactsStore.getSelected(),
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: true
    }
  },

  componentDidMount : function() {
    this.props.contactsStore.addChangeListener(this.onContactsChange);
    this.props.contactsStore.addSelectionChangeListener(this.onSelectionChange);
  },

  componentWillUnmount : function() {
    this.props.contactsStore.removeChangeListener(this.onContactsChange);
    this.props.contactsStore.removeSelectionChangeListener(
      this.onSelectionChange);
  },

  onContactsChange : function() {
    this.setState({
      contacts : this.props.contactsStore.getContacts(),
      selectedContacts : this.props.contactsStore.getSelected()
    });
  },

  getContact : function( index ) {
    return this.state.contacts[index];
  },

  onRowSelection : function( selectedRows ) {
    ContactActions.selectContacts( selectedRows );
  },

  onSelectionChange : function() {
    this.setState({ selectedContacts : this.props.contactsStore.getSelected() });
  },

  render : function() {
    var that = this;
    return (
      <Table
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}
        onRowSelection={this.onRowSelection}>

        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}>
          <TableRow>
            <TableHeaderColumn colSpan={2}>
              <FilterByEmailControls />
            </TableHeaderColumn>
            <TableHeaderColumn colSpan={2}>
              <SortByEmailControls />
            </TableHeaderColumn>
            <TableHeaderColumn colSpan={1} />
          </TableRow>
          <TableRow>
            <TableHeaderColumn>First Name</TableHeaderColumn>
            <TableHeaderColumn>Last Name</TableHeaderColumn>
            <TableHeaderColumn>Phone Number</TableHeaderColumn>
            <TableHeaderColumn>Email Address</TableHeaderColumn>
            <TableHeaderColumn>Company</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}>

          {this.state.contacts.map( (contact, index) => (
            <TableRow
              key={index}
              selected={that.state.selectedContacts.indexOf(index) > -1}>
              <TableRowColumn>{contact.first_name}</TableRowColumn>
              <TableRowColumn>{contact.last_name}</TableRowColumn>
              <TableRowColumn>{contact.phone_number}</TableRowColumn>
              <TableRowColumn>{contact.email_address}</TableRowColumn>
              <TableRowColumn>{contact.company_name}</TableRowColumn>
            </TableRow>
          ))}

        </TableBody>

      </Table>
    );
  }
});

module.exports = ContactsTable;
