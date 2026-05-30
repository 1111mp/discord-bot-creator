import { Outlet } from 'react-router';

// export async function loader({ params }: LoaderFunctionArgs) {
//   console.log('params', params);
// }

export function Component() {
  return (
    <div className='flex flex-1'>
      <Outlet />
    </div>
  );
}
