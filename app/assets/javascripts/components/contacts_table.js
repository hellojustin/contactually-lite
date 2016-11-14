var React             = require('react'),
    mui               = require('material-ui'),
    ContactRow        = require('./contact_row'),
    Table             = mui.Table,
    TableRow          = mui.TableRow,
    TableBody         = mui.TableBody,
    TableHeader       = mui.TableHeader,
    TableHeaderColumn = mui.TableHeaderColumn,
    TableRowColumn    = mui.TableRowColumn;

var ContactsTable = React.createClass({

  propTypes : {
    contactsStore: React.PropTypes.object.isRequired
  },

  getInitialState : function() {
    return {
      contacts: this.props.contactsStore.getContacts(),
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true
    }
  },

  componentDidMount : function() {
    this.props.contactsStore.addChangeListener(this.onContactsChange);
  },

  componentWillUnmount : function() {
    this.props.contactsStore.removeChangeListener(this.onContactsChange);
  },

  onContactsChange : function() {
    this.setState({
      contacts : this.props.contactsStore.getContacts()
    });
  },

  getContact : function( contactId ) {
    return this.state.contacts[contactId-1];
  },

  render : function() {
    var that = this;
    return (
      <Table
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}>

        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}>
          <TableRow>
            <TableHeaderColumn tooltip='First Name'>First Name</TableHeaderColumn>
            <TableHeaderColumn tooltip='Last Name'>Last Name</TableHeaderColumn>
            <TableHeaderColumn tooltip='Phone Number'>Phone Number</TableHeaderColumn>
            <TableHeaderColumn tooltip='Email Address'>Email Address</TableHeaderColumn>
            <TableHeaderColumn tooltip='Company Name'>Company</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}>

          {this.state.contacts.map( (row, index) => (
            <ContactRow
              key={row.id}
              contactId={row.id}
              getContact={that.getContact}>
            </ContactRow>
          ))}

        </TableBody>

      </Table>
    );
  }
});

module.exports = ContactsTable;
