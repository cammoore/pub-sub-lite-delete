import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Stuffs, stuffPublicationNames } from '../../api/stuff/StuffCollection';
import { stuffUpdateMethod } from '../../api/stuff/StuffCollection.methods';

const submit = (data) => {
  const { name, quantity, condition, _id } = data;
  const updateData = {
    id: _id,
    name,
    quantity,
    condition,
  };
  stuffUpdateMethod.call(updateData, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
};

const EditStuff = (props) => {
  if (props.ready) {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Stuff</Header>
            <AutoForm schema={Stuffs.getSchema()} onSubmit={data => submit(data)} model={props.doc}>
              <Segment>
                <TextField name='name' />
                <NumField name='quantity' decimal={false} />
                <SelectField name='condition' />
                <SubmitField value='Submit' />
                <ErrorsField />
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
  return (<Loader active>Getting data</Loader>);
};

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditStuff.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribeLite(stuffPublicationNames.stuff);
  return {
    doc: Stuffs.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStuff);
