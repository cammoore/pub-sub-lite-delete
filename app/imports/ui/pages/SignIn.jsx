import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e, { name, value }) => {
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'error':
        setError(value);
        break;
      case 'redirect':
        setRedirect(value);
        break;
      default:
    }
  };

  const submit = () => {
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirect(true);
      }
    });
  };

  const { from } = props.location.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return <Redirect to={from}/>;
  }
  return (
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Login to your account
            </Header>
            <Form onSubmit={submit}>
              <Segment stacked>
                <Form.Input
                    label="Email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={handleChange}
                />
                <Form.Input
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                />
                <Form.Button content="Submit"/>
              </Segment>
            </Form>
            <Message>
              <Link to="/signup">Click here to Register</Link>
            </Message>
            {error === '' ? (
                ''
            ) : (
                <Message
                    error
                    header="Login was not successful"
                    content={error}
                />
            )}
          </Grid.Column>
        </Grid>
      </Container>
  );
};

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};

export default Signin;
