import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { StackedPage } from './index';

test('StackedPage can renders with Router', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <StackedPage>
        <div>Dummy content</div>
      </StackedPage>
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
