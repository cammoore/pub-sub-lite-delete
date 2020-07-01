import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { stuffPublicationNames, Stuffs } from '../../api/stuff/StuffCollection';
import StuffItemAdmin from '../components/StuffItemAdmin';

const ListStuffAdmin = (props) => {
  if (props.ready) {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Stuff (Admin)</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
                <Table.HeaderCell>Owner</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.stuffs.map((stuff) => <StuffItemAdmin key={stuff._id} stuff={stuff} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
  return (<Loader active>Getting data</Loader>);
};


/** Require an array of Stuff documents in the props. */
ListStuffAdmin.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(stuffPublicationNames.stuffAdmin);
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStuffAdmin);
