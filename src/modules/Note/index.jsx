import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { DrawerNavigator } from '../../components/DrawerNavigator';

import { Editor } from './components/Editor';
import { Gallery } from './components/Gallery';

export const Note = () => (
  <DrawerNavigator navTitle="Note">
    <Switch>
      <Route path="/note/edit/:id" component={Editor} />
      <Route path="/note" component={Gallery} />
    </Switch>
  </DrawerNavigator>
);

export default Note;
