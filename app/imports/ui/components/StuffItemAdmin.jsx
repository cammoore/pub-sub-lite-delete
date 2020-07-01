import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const StuffItemAdmin = (props) => (
    <Table.Row>
      <Table.Cell>{props.stuff.name}</Table.Cell>
      <Table.Cell>{props.stuff.quantity}</Table.Cell>
      <Table.Cell>{props.stuff.condition}</Table.Cell>
      <Table.Cell>{props.stuff.owner}</Table.Cell>
    </Table.Row>
);

/** Require a document to be passed to this component. */
StuffItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default StuffItemAdmin;
