import {
  BadgeCheckIcon,
  ChevronRightIcon,
  Info,
  MoonStar,
  Sun,
  SunMoon,
} from 'lucide-react';

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
            Select an existing project or create a new one to get started.
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
                    <DropdownMenuLabel>My Projects</DropdownMenuLabel>
                    <DropdownMenuItem className='py-1.5'>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='py-1.5'>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='py-1.5'>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className='w-full' size='xl'>
                Create Project
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}

export default WelcomePage;
