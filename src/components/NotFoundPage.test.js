import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('render', () => {
    const view = render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(view).toMatchSnapshot();
  });
});
