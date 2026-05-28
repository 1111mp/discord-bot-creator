import { RouterProvider } from 'react-router';

import { Toaster, TooltipProvider } from '@/components/ui';
import { router } from '@/routes';

export default function App() {
  return (
    <>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
      <Toaster position='top-center' />
    </>
  );
}
