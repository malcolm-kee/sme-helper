import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing';

const Overview = () => (
  <Switch>
    <Route exact path="/overview" component={Landing} />
  </Switch>
);

export default Overview;
