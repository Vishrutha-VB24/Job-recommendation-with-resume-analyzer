import { Logout } from '@/components/Logout'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'



export const Route = createRootRoute({
  component: () => (
    <>
      {/* <nav className="text-white p-4 flex justify-between items-center top-0" style={{backgroundColor:"#F7CF87",color:"#4D4646"}}>
        <div className="flex space-x-4">
          
          
        </div>
      </nav> */}
      <nav
        className='fixed top-0 left-0 bg-primary h-[3.5rem] w-screen px-16 flex justify-between items-center text-white'
      >
        <div className='logo'>
            <h1 className='text-2xl  font-semibold'>RESUME TO JOB</h1>
        </div>
        <div className='navlist  '>
          <ul className='flex gap-5'>
            <li>
              <Link to="/" className="[&.active]:font-bold">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/login" className="[&.active]:font-bold">
                LOGIN
              </Link>
            </li>
            <li>
              <Link to="/register" className="[&.active]:font-bold">
                REGISTER
              </Link>
            </li>
            <li><Logout></Logout></li>
          </ul>

        </div>
      </nav>
      <Outlet/>
      <TanStackRouterDevtools/>
    </>
  ),
})