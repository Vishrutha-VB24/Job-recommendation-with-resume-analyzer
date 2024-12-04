import { createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import {AuthStoreType} from "@/store/authStore.ts";
import {Navbar} from "@/components/Navbar.tsx";

interface RouterContext {
  auth: AuthStoreType
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});

