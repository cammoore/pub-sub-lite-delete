import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Header } from 'semantic-ui-react';

const NavBar = (props) => {
  const menuStyle = { marginBottom: '10px' };
  return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>meteor-application-template</Header>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>
      </Menu>
  );
};

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBar);
