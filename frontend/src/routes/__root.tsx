// import { Logout } from '@/components/Logout'
// import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import { useState } from 'react';



// export const Route = createRootRoute({
//   component: () => (
//     <>
//       {/* <nav className="text-white p-4 flex justify-between items-center top-0" style={{backgroundColor:"#F7CF87",color:"#4D4646"}}>
//         <div className="flex space-x-4">
          
          
//         </div>
//       </nav> */}
//       <nav
//         className='fixed top-0 left-0 bg-primary/70 h-[3.5rem] w-screen px-16 flex justify-between items-center'
//       >
//         <div className='logo'>
//             <h1 className='text-2xl font-semibold'>RESUME TO JOB</h1>
//         </div>
//         <div className='navlist  '>
//           <ul className='flex gap-5'>
//             <li>
//               <Link to="/" className="[&.active]:font-bold">
//                 HOME
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" className="[&.active]:font-bold">
//                 LOGIN
//               </Link>
//             </li>
//             <li>
//               <Link to="/register" className="[&.active]:font-bold">
//                 REGISTER
//               </Link>
//             </li>
//             <li><Logout
//                   isActive={activeLink === 'logout'}
//                   onClick={() => handleLinkClick('logout')}
//                 /></li>
//           </ul>

//         </div>
//       </nav>
//       <Outlet/>
//       <TanStackRouterDevtools/>
//     </>
//   ),
// })




import { useState } from 'react';
import { Logout } from '@/components/Logout';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => {
    const [activeLink, setActiveLink] = useState(""); // Track active link

    const handleLinkClick = (linkName) => {
      setActiveLink(linkName); // Set the active link to the clicked one
    };

    return (
      <>
        <nav className="fixed top-0 left-0 bg-primary/70 h-[3.5rem] w-screen px-16 flex justify-between items-center">
          <div className="logo">
            <h1 className="text-2xl font-semibold">RESUME TO JOB</h1>
          </div>
          <div className="navlist">
            <ul className="flex gap-5">
              <li>
                <Link
                  to="/"
                  className={`${activeLink === 'home' ? 'font-bold' : ''}`}
                  onClick={() => handleLinkClick('home')}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={`${activeLink === 'login' ? 'font-bold' : ''}`}
                  onClick={() => handleLinkClick('login')}
                >
                  LOGIN
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`${activeLink === 'register' ? 'font-bold' : ''}`}
                  onClick={() => handleLinkClick('register')}
                >
                  REGISTER
                </Link>
              </li>
              <li>
                <Logout
                  isActive={activeLink === 'logout'}
                  onClick={() => handleLinkClick('logout')}
                />
              </li>
            </ul>
          </div>
        </nav>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});

