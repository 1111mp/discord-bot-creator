import {
  BadgeCheckIcon,
  ChevronRightIcon,
  FolderOpenIcon,
  Info,
  MoonStar,
  Sun,
  SunMoon,
} from 'lucide-react';
import { useLoaderData, useNavigate } from 'react-router';

import { ProjectCreator } from '@/components';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
  Label,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui';

function WelcomePage() {
  const navigate = useNavigate();
  const { projects = [] } = useLoaderData<{ projects: DBC.IProject[] }>();

  const hasProjects = projects.length > 0;

  return (
    <div className='flex flex-1 justify-center items-center'>
      <Button
        variant='outline'
        size='icon-lg'
        className='absolute top-4 right-4'
      >
        {/* <X className='size-5' /> */}
        <Info className='size-5' />
      </Button>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Select an existing project or create a new one to start building
            your Discord bot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className='gap-8'>
            <Field className='gap-3'>
              <FieldLabel className='justify-center'>Appearance</FieldLabel>
              <ToggleGroup
                type='single'
                variant='outline'
                className='flex items-center gap-3'
              >
                <ToggleGroupItem
                  value='system'
                  aria-label='System'
                  className='flex-1'
                >
                  <SunMoon className='size-5' />
                  <Label>System</Label>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='dark'
                  aria-label='Dark'
                  className='flex-1'
                >
                  <MoonStar className='size-5' />
                  <Label>Dark</Label>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='light'
                  aria-label='Light'
                  className='flex-1'
                >
                  <Sun className='size-5' />
                  <Label>Light</Label>
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>
            <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
              Or continue with
            </FieldSeparator>
            <Field>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Item
                    variant='outline'
                    size='sm'
                    className='transition-colors hover:bg-muted'
                  >
                    <ItemMedia>
                      <BadgeCheckIcon className='size-5' />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Select your project to start.</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRightIcon className='size-4' />
                    </ItemActions>
                  </Item>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    {hasProjects ? (
                      <>
                        <DropdownMenuLabel>My Projects</DropdownMenuLabel>
                        {projects.map(({ id, name }) => (
                          <DropdownMenuItem
                            key={id}
                            className='py-1.5'
                            onClick={() => {
                              navigate(`/projects/${id}`);
                            }}
                          >
                            {name}
                            <DropdownMenuShortcut>
                              <ChevronRightIcon className='size-4' />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        ))}
                      </>
                    ) : (
                      <div className='flex flex-col items-center justify-center gap-2 p-6 text-center'>
                        <FolderOpenIcon className='size-6 text-muted-foreground/50' />
                        <div className='space-y-1'>
                          <p className='text-sm font-medium'>No projects yet</p>
                          <p className='text-muted-foreground text-xs'>
                            Create your first bot project to get started.
                          </p>
                        </div>
                      </div>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <ProjectCreator />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}

export default WelcomePage;
