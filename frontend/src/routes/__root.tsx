import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'



export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="text-white p-4 flex justify-between items-center top-0" style={{backgroundColor:"#F7CF87",color:"#4D4646"}}>
        <div className="flex space-x-4">
          <Link to="/" className="[&.active]:font-bold">
            HOME
          </Link>
          <Link to="/login" className="[&.active]:font-bold">
            LOGIN
          </Link>
        </div>
      </nav>
      <Outlet/>
      <TanStackRouterDevtools/>
    </>
  ),
})