import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Overview } from './index';

test('Overview can renders with Router', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Overview />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
