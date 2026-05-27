import { createMemoryRouter } from 'react-router';

import HomePage from '@/pages/home';

export const router = createMemoryRouter(
  [
    {
      path: '/',
      Component: HomePage,
    },
  ],
  {
    initialEntries: ['/'],
  },
);
