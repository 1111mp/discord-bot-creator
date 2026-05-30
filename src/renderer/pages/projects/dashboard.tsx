import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CircleAlert,
  CirclePlay,
  CircleStop,
  LoaderCircle,
  RotateCcw,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
} from 'react-router';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle, Button } from '@/components/ui';

export async function loader({ params }: LoaderFunctionArgs) {
  const { projectId } = params;
  const settings = await window.electron.ipcService.botProject.getSettings(
    projectId!,
  );
  return { settings };
}

export function Component() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const { settings: initialSettings } = useLoaderData<{
    settings: DBC.BotProject.Setting;
  }>();

  const { data: settings, refetch } = useQuery({
    queryKey: ['bot-project-settings', projectId],
    queryFn: () =>
      window.electron.ipcService.botProject.getSettings(projectId!),
    initialData: initialSettings,
    enabled: false,
    staleTime: Infinity,
  });
  const RUNTIME_INFO_KEY = ['bot-project-process-info', projectId];
  const { data: runtimeInfo } = useQuery({
    queryKey: RUNTIME_INFO_KEY,
    queryFn: () =>
      window.electron.ipcService.botProject.getRuntimeInfo(projectId!),
    enabled: !!projectId && settings.depsInstalled,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!projectId) return;

    const unsub = window.electron.ipcService.botProject.onRuntimeInfo(
      (info: DBC.Runtime.ProcessInfo) => {
        queryClient.setQueryData(RUNTIME_INFO_KEY, info);
      },
    );
    return unsub;
  }, [projectId, queryClient]);

  const { depsInstalled = false, prefix, token = '', clientId } = settings;

  if (!projectId) return null;

  return (
    <div className='flex-1'>
      {depsInstalled ? (
        <InfoAlert projectId={projectId} info={runtimeInfo} />
      ) : (
        <DepsAlert
          projectId={projectId}
          onRefresh={() => {
            refetch();
          }}
        />
      )}
    </div>
  );
}

function InfoAlert({
  projectId,
  info,
}: {
  projectId: string;
  info?: DBC.Runtime.ProcessInfo;
}) {
  const [currentAction, setCurrentAction] = useState<
    'starting' | 'stopping' | 'restarting' | null
  >(null);

  const startMutation = useMutation({
    mutationFn: () => window.electron.ipcService.botProject.start(projectId),
    onMutate() {
      setCurrentAction('starting');
    },
    onError(error) {
      console.error(error);
      toast.error(error?.message || 'Failed to start project');
      setCurrentAction(null);
    },
  });
  const stopMutation = useMutation({
    mutationFn: () => window.electron.ipcService.botProject.stop(projectId),
    onMutate() {
      setCurrentAction('stopping');
    },
    onError(error) {
      console.error(error);
      toast.error(error?.message || 'Failed to stop project');
      setCurrentAction(null);
    },
  });
  const restartMutation = useMutation({
    mutationFn: () => window.electron.ipcService.botProject.restart(projectId),
    onMutate() {
      setCurrentAction('restarting');
    },
    onError(error) {
      console.error(error);
      toast.error(error?.message || 'Failed to restart project');
      setCurrentAction(null);
    },
  });

  useEffect(() => {
    setCurrentAction(null);
  }, [info?.updatedAt]);

  if (!info) return null;

  const isPending = currentAction !== null;
  const alertConfig: Record<string, any> = {
    running: {
      variant: 'success',
      title: 'Project is Running',
      description: 'The project is active and running smoothly.',
      buttons: (
        <>
          <Button
            variant='secondary'
            disabled={isPending}
            onClick={() => restartMutation.mutate()}
          >
            {currentAction === 'restarting' ? (
              <LoaderCircle className='animate-spin' />
            ) : (
              <RotateCcw />
            )}
            Restart
          </Button>
          <Button
            variant='destructive'
            disabled={isPending}
            onClick={() => stopMutation.mutate()}
          >
            {currentAction === 'stopping' ? (
              <LoaderCircle className='animate-spin' />
            ) : (
              <CircleStop />
            )}
            Stop
          </Button>
        </>
      ),
    },
    error: {
      variant: 'destructive',
      title: 'Project Execution Error',
      description: 'An unexpected error occurred while running the project.',
      buttons: (
        <Button
          variant='secondary'
          disabled={isPending}
          onClick={() => restartMutation.mutate()}
        >
          {currentAction === 'restarting' ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <RotateCcw />
          )}
          Restart
        </Button>
      ),
    },
    stopped: {
      variant: 'default',
      title: 'Project Status',
      description: 'The bot project is ready to run. Click start to launch it.',
      buttons: (
        <Button
          variant='default'
          disabled={isPending}
          onClick={() => startMutation.mutate()}
        >
          {currentAction === 'starting' ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <CirclePlay />
          )}
          Start
        </Button>
      ),
    },
  };

  const config = alertConfig[info.status];
  return (
    <Alert
      variant={config.variant}
      className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-200'
    >
      <div className='flex items-start gap-3'>
        <CircleAlert />
        <div>
          <AlertTitle>{config.title}</AlertTitle>
          <AlertDescription>{config.description}</AlertDescription>
        </div>
      </div>
      <div
        className='flex items-center gap-1.5 transition-opacity duration-200'
        key={info.status}
      >
        {config.buttons}
      </div>
    </Alert>
  );
}

function DepsAlert({
  projectId,
  onRefresh,
}: {
  projectId: string;
  onRefresh: VoidFunction;
}) {
  const mutation = useMutation({
    mutationFn: () =>
      window.electron.ipcService.botProject.installDeps(projectId),
    onSuccess() {
      console.log('onSuccess');
      onRefresh?.();
    },
    onError(error) {
      console.error(error);
      toast.error(error?.message || 'Failed to install dependencies');
    },
  });

  return (
    <Alert className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      <div className='flex items-start gap-3'>
        <CircleAlert />
        <div>
          <AlertTitle>Missing Dependencies</AlertTitle>
          <AlertDescription>
            The bot project dependencies are not installed yet. Please run
            installation to ensure the project runs properly.
          </AlertDescription>
        </div>
      </div>
      <div className='shrink-0'>
        <Button
          variant='default'
          disabled={mutation.isPending}
          className='w-full sm:w-auto font-medium'
          onClick={() => {
            mutation.mutate();
          }}
        >
          {mutation.isPending && <LoaderCircle className='animate-spin' />}
          Install Dependencies
        </Button>
      </div>
    </Alert>
  );
}
