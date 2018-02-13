import React from 'react';

import { DrawerNavigator } from '../../components/DrawerNavigator';

import { Editor } from './components/Editor';

export const Note = () => (
  <DrawerNavigator navTitle="Note">
    <Editor />
  </DrawerNavigator>
);

export default Note;
