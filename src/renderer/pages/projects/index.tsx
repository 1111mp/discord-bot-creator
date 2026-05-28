import type { LoaderFunctionArgs } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  console.log('params', params);
}

export function Component() {
  return <div>Projects</div>;
}
