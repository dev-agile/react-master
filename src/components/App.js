import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';

/* eslint-disable */
import ErrorPage from '../pages/error';
/* eslint-enable */

import LayoutComponent from '../components/Layout';
import LoginComponent from '../pages/login';
import '../styles/theme.scss';
import DocumentationLayoutComponent from "../documentation/DocumentationLayout";

const PrivateRoute = ({ component, ...rest }) => {
  return ( // eslint-disable-line
  <Route
    {...rest} render={props => (
    localStorage.getItem('id_token') ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }, // eslint-disable-line
        }}
      />
    )
  )}
  />
);
}

class App extends React.PureComponent {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app/main" />} />
          <Route path="/app" exact render={() => <Redirect to="/app/main" />} />
          <PrivateRoute path="/app" component={LayoutComponent} />
          <Route path="/documentation" exact render={() => <Redirect to="/documentation/getting-started/overview" />} />
          <PrivateRoute path="/documentation" component={DocumentationLayoutComponent} />
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/error" exact component={ErrorPage} />
          <Redirect from="*" to="/app/main/analytics" />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(App);
