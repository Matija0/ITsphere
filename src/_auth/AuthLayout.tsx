import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import sideImg from "@/assets/images/side-img.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || 'null');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <section className="flex flex-1 justify-between items-center py-10">
      <div className='flex justify-center w-full'>
      {children}
      </div>
      <img
        src={sideImg}
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </section>
  );
};

export default AuthLayout;