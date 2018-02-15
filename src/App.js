import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Reboot } from 'material-ui';

import configureStore from './config/configureStore';
import { restoreStore } from './config/restoreStore';
import asyncComponent from './components/AsyncComponent';

const LoginForm = asyncComponent(() => import('./modules/Auth/components/LoginForm'));
const RegisterForm = asyncComponent(() =>
  import('./modules/Auth/components/RegisterForm')
);
const PreloginLanding = asyncComponent(() =>
  import('./modules/Auth/components/PreloginLanding')
);
const Overview = asyncComponent(() => import('./modules/Overview'));
const Search = asyncComponent(() => import('./components/Search'));
const Note = asyncComponent(() => import('./modules/Note'));

const store = configureStore();

restoreStore(store);

const RootRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/search" component={Search} />
        <Route path="/note" component={Note} />
        <Route path="/overview" component={Overview} />
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
