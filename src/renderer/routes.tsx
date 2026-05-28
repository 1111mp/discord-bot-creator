import { createMemoryRouter } from 'react-router';

import HomePage from '@/pages/home';
import WelcomePage from '@/pages/welcome';

export const router = createMemoryRouter(
  [
    {
      Component: HomePage,
      children: [
        {
          path: '/welcome',
          Component: WelcomePage,
        },
      ],
    },
  ],
  {
    initialEntries: ['/welcome'],
  },
);
