import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { configureStore } from '../../config/configureStore';

import { Note } from './index';

jest.mock('../../services/db', () => {
  const { mockNoteStore } = require('../../services/mockDb');
  return mockNoteStore;
});

test('Note can renders with Router', () => {
  const store = configureStore();
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter>
        <Note />
      </MemoryRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
