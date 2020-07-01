import 'semantic-ui-css/semantic.css';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ListStuff from '../pages/ListStuff';
import AddStuff from '../pages/AddStuff';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';

export const App = () => (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={ListStuff} />
          <Route path="/list" component={ListStuff} />
          <Route path="/add" component={AddStuff} />
          <Route path="/edit/:_id" component={EditStuff} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
);
