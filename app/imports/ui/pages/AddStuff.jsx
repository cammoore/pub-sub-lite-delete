import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { stuffDefineMethod } from '../../api/stuff/StuffCollection.methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const schema = new SimpleSchema({
  name: String,
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

const formSchema = new SimpleSchema2Bridge(schema);

const submit = (data, formRef) => {
  const { name, quantity, condition } = data;
  const owner = Meteor.user().username;
  stuffDefineMethod.call({ name, quantity, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
};

const AddStuff = () => {
  let fRef = null;
  return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Stuff</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => submit(data, fRef)} >
            <Segment>
              <TextField name='name'/>
              <NumField name='quantity' decimal={false}/>
              <SelectField name='condition'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
  );
};

export default AddStuff;
