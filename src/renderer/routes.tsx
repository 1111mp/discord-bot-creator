import { createMemoryRouter } from 'react-router';

import HomePage from '@/pages/home';
import WelcomePage from '@/pages/welcome';

export const router = createMemoryRouter(
  [
    {
      path: '/',
      loader: async () => {
        const projects = await window.electron.ipcService.project.getAll();
        return {
          projects,
        };
      },
      Component: HomePage,
      children: [
        {
          path: 'welcome',
          Component: WelcomePage,
        },
        {
          path: 'projects/:projectId',
          lazy: () => import('@/pages/projects'),
          handle: {
            breadcrumb: (_data: unknown, params: { projectId: string }) =>
              params.projectId,
          },
          children: [
            {
              path: 'dashboard',
              lazy: () => import('@/pages/projects/dashboard'),
              handle: { breadcrumb: 'Dashboard' },
            },
          ],
        },
      ],
    },
  ],
  {
    initialEntries: ['/welcome'],
  },
);
