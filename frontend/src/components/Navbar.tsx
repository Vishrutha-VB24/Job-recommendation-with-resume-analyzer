import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Logout } from '@/components/Logout';
import useAuthStore from "@/store/authStore.ts";

export const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState(""); // Track active link

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName); // Set the active link to the clicked one
  };
  const {userInfo} = useAuthStore();
  return (
      <nav className="fixed top-0 left-0 z-50 bg-primary/70 h-[3.5rem] w-screen px-16 flex justify-between items-center">
        <div className="logo">
          <h1 className="text-2xl font-semibold">
            RESUME TO JOB
          </h1>
        </div>
        <div className="navlist">
          <ul className="flex gap-5">
            {
              userInfo &&
              <li>
                <Link
                  to="/"
                  className={`${activeLink === 'home' ? 'font-bold' : ''}`}
                  onClick={() => handleLinkClick('home')}
                >
                  HOME
                </Link>
              </li>
            }
            {
              !userInfo &&
                <>
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
                </>
            }
            {
              userInfo &&
                <li>
                    <Logout/>
                </li>
            }
          </ul>
        </div>
      </nav>
  );
};
