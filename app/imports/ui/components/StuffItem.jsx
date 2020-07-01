import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';
import { stuffRemoveItMethod } from '../../api/stuff/StuffCollection.methods';

const handleClick = (props) => () => {
  stuffRemoveItMethod.call(props.stuff._id, (error, result) => {
    if (error) {
      swal('Error', error.message, 'error');
    } else {
      swal('Success', 'Item deleted successfully', 'success');
    }
  });
}

const StuffItem = (props) => (
    <Table.Row>
      <Table.Cell>{props.stuff.name}</Table.Cell>
      <Table.Cell>{props.stuff.quantity}</Table.Cell>
      <Table.Cell>{props.stuff.condition}</Table.Cell>
      <Table.Cell>
        <Link to={`/edit/${props.stuff._id}`}>Edit</Link>
      </Table.Cell>
      <Table.Cell><Button onClick={handleClick(props)}>Delete</Button> </Table.Cell>
    </Table.Row>
);

/** Require a document to be passed to this component. */
StuffItem.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
