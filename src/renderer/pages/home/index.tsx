import { Fragment, useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useMatches,
  type Params,
  type UIMatch,
} from 'react-router';

import { AppSidebar } from '@/components';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui';
import { useProjectStore } from '@/stores';

type BreadcrumbMatch = Omit<UIMatch, 'handle'> & {
  handle: {
    breadcrumb?:
      | string
      | ((data: any, params: Params<string>) => React.ReactNode);
  };
};

function HomePage() {
  const matches = useMatches() as BreadcrumbMatch[];
  const { projects } = useLoaderData<{ projects: DBC.IProject[] }>();
  const setProjects = useProjectStore((s) => s.setProjects);

  useEffect(() => {
    setProjects(projects);
  }, [projects, setProjects]);

  const validMatches = matches.filter(
    (match) => match.handle && match.handle.breadcrumb,
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 region-drag transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1 region-no-drag' />
            {validMatches.length > 0 ? (
              <>
                <Separator
                  orientation='vertical'
                  className='mr-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center'
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    {validMatches.map((match, index) => {
                      const { breadcrumb } = match.handle,
                        isLast = index === validMatches.length - 1;

                      const label =
                        typeof breadcrumb === 'function'
                          ? breadcrumb(match.loaderData, match.params)
                          : breadcrumb;

                      return (
                        <Fragment key={match.pathname}>
                          <BreadcrumbItem className='hidden md:block'>
                            {isLast ? (
                              <BreadcrumbPage className='region-no-drag'>
                                {label}
                              </BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink className='region-no-drag'>
                                {label}
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </>
            ) : null}
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default HomePage;
