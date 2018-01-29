import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DrawerNavigator from '../../components/DrawerNavigator';

import Landing from './components/Landing';

const Overview = () => (
  <DrawerNavigator navTitle="Overview">
    <Switch>
      <Route exact path="/overview" component={Landing} />
    </Switch>
  </DrawerNavigator>
);

export default Overview;
