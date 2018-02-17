import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Search } from './index';

test('Search can renders with Router', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
