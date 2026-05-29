'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { useProjectStore } from '@/stores';

function ProjectSwitcher() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { projects } = useProjectStore(
    useShallow((s) => ({
      projects: s.projects,
    })),
  );

  const activeProject = projects.find((p) => p.id === projectId);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground region-no-drag'
            >
              {/* <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <activeDevice.logo className='size-4' />
              </div> */}
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span
                  className={cn(
                    'truncate font-medium',
                    !activeProject && 'opacity-70',
                  )}
                >
                  {activeProject ? activeProject.name : 'Select your project'}
                </span>
                {/* <span className='truncate text-xs'>{activeDevice.plan}</span> */}
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Projects
            </DropdownMenuLabel>
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => {
                  if (projectId === project.id) return;
                  void navigate(`/projects/${project.id}`);
                }}
                className='gap-2 p-2'
              >
                {/* <div className='flex size-6 items-center justify-center rounded-md border'>
                  <device.logo className='size-3.5 shrink-0' />
                </div> */}
                {project.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>
                Add project
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { ProjectSwitcher };
