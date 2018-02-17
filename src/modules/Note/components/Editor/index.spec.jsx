import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';

import { configureStore } from '../../../../config/configureStore';

import { Editor } from './index';

jest.mock('../../../../services/db', () => {
  const mockDb = require('../../../../services/mockDb');
  return mockDb;
});

test('Editor can renders with Router', () => {
  const store = configureStore();
  const div = document.createElement('div');
  const EditorWithRouter = withRouter(Editor);
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/note/add']}>
        <EditorWithRouter />
      </MemoryRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
