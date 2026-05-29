import type { LoaderFunctionArgs } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  console.log('Dashboard params', params);
}

export function Component() {
  return <div>Dashboard</div>;
}
