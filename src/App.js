import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Reboot } from 'material-ui';

import configureStore from './config/configureStore';

import LoginForm from './modules/Auth/components/LoginForm';
import RegisterForm from './modules/Auth/components/RegisterForm';
import PreloginLanding from './modules/Auth/components/PreloginLanding';
import Overview from './modules/Overview';

const store = configureStore();

const RootRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/overview" component={Overview} />
        <Route path="/" component={PreloginLanding} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

class App extends Component {
  render() {
    return (
      <div>
        <Reboot />
        <RootRouter />
      </div>
    );
  }
}

export default App;
