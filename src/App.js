import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Reboot } from 'material-ui';

import LoginForm from './modules/Auth/components/LoginForm';
import RegisterForm from './modules/Auth/components/RegisterForm';
import PreloginLanding from './modules/Auth/components/PreloginLanding';

const RootRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/login" component={LoginForm} />
      <Route path="/" component={PreloginLanding} />
    </Switch>
  </BrowserRouter>
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
