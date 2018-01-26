import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Reboot } from 'material-ui';

import LoginForm from './modules/Auth/components/LoginForm';

const RootRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LoginForm} />
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
