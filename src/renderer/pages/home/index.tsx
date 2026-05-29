import { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router';

import { AppSidebar } from '@/components';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui';
import { useProjectStore } from '@/stores';

function HomePage() {
  const { projects } = useLoaderData<{ projects: DBC.IProject[] }>();
  const setProjects = useProjectStore((s) => s.setProjects);

  useEffect(() => {
    setProjects(projects);
  }, [projects, setProjects]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='relative'>
          <div className='absolute top-6 peer-data-[state=open]:top-2'>
            <SidebarTrigger />
          </div>
        </header>
        <div className='flex flex-1'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default HomePage;
