import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { DrawerNavigator } from '../../components/DrawerNavigator';

import Landing from './components/Landing';
import AwesomeDetails from './components/AwesomeDetails';
import NotSoAwesomeDetails from './components/NotSoAwesomeDetails';
import { AwesomeForm } from './components/AwesomeForm';

const Overview = () => (
  <DrawerNavigator navTitle="Overview">
    <Switch>
      <Route exact path="/overview/details" component={AwesomeDetails} />
      <Route exact path="/overview/bad-details" component={NotSoAwesomeDetails} />
      <Route exact path="/overview/awesome-form" component={AwesomeForm} />
      <Route exact path="/overview" component={Landing} />
    </Switch>
  </DrawerNavigator>
);

export default Overview;
