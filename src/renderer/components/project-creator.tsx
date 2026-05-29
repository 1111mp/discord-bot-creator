import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, SquarePenIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { z } from '@/lib/zod';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
} from './ui';

const schema = z.object({
  name: z.string().min(1, 'Invalid name').max(24, 'Invalid name'),
  description: z.string().optional(),
  path: z.string().min(1, 'Invalid path'),
});

export function ProjectCreator() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      path: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof schema>) => {
    setLoading(true);
    try {
      const { id } = await window.electron.ipcService.project.create({
        ...value,
        id: uuidv4(),
      });

      toast.success('Project created successfully');
      setOpen(false);
      form.reset();

      void navigate(`/projects/${id}`);
    } catch (error) {
      toast.error(error?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full' size='xl'>
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new project.
          </DialogDescription>
        </DialogHeader>
        <form id='form-create-project' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='project-name'>Name</FieldLabel>
                  <Input
                    {...field}
                    id='project-name'
                    placeholder='Project name'
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='project-description'>
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id='project-description'
                    aria-invalid={fieldState.invalid}
                    placeholder='Optional description'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='path'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='project-path'>Path</FieldLabel>
                  <ButtonGroup data-invalid={fieldState.invalid}>
                    <Input
                      disabled
                      id='project-path'
                      value={field.value}
                      aria-invalid={fieldState.invalid}
                      placeholder='Select a folder'
                    />
                    <Button
                      variant='outline'
                      onClick={async (evt) => {
                        evt.preventDefault();
                        const { canceled, filePaths } =
                          await window.electron.ipcService.dialog.showOpenDialog(
                            {
                              title: '',
                              properties: ['openDirectory', 'createDirectory'],
                            },
                          );
                        if (canceled) return;
                        field.onChange?.(filePaths[0]);
                      }}
                    >
                      <SquarePenIcon />
                    </Button>
                  </ButtonGroup>
                  <FieldDescription>
                    Choose where your project will be stored
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={loading}>
                {loading && <LoaderCircle size={16} className='animate-spin' />}
                Continue
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
