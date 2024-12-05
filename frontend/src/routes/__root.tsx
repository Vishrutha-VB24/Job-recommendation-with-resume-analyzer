import { createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import {AuthStoreType} from "@/store/authStore.ts";
import {Navbar} from "@/components/Navbar.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

interface RouterContext {
  auth: AuthStoreType
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Navbar />
        <ScrollArea className="w-screen h-[calc(100vh-3.5rem)] mt-[3.5rem]  px-16 ">
          <Outlet />
        </ScrollArea>
        <TanStackRouterDevtools />
      </>
    );
  },
});

