import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import { Note } from './index';

jest.mock('../../services/db', () => {
  const { mockNoteStore } = require('../../services/mockDb');
  return mockNoteStore;
});

test('Note can renders with Router', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Note />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
