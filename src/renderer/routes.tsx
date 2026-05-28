import { createMemoryRouter } from 'react-router';

import HomePage from '@/pages/home';
import WelcomePage from '@/pages/welcome';

export const router = createMemoryRouter(
  [
    {
      path: '/',
      Component: HomePage,
      children: [
        {
          path: 'welcome',
          loader: async () => {
            const projects = await window.electron.ipcService.project.getAll();
            return {
              projects,
            };
          },
          Component: WelcomePage,
        },
        {
          path: 'projects/:projectId',
          lazy: () => import('@/pages/projects'),
        },
      ],
    },
  ],
  {
    initialEntries: ['/welcome'],
  },
);
