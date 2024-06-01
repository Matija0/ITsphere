import { sidebarLinks } from "@/constants/links";
import { INavLink } from "@/types";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const [userData, setUserData] = useState<undefined | string>();

  useEffect(() => {
    const user = useGetUser();
    if (user !== null) {
      const fetchUserData = async () => {
        const response = await axios.get(`${baseUrl}/users/${user.userID}`);
        setUserData(response.data);
      };
      fetchUserData();
    }
  }, []);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          ITsphere
        </Link>

        <Link
          to={`/profile/${userData?._id}`}
          className="flex gap-3 items-center"
        >
            <img
              src={`http://localhost:5000/${userData?.profilePicture}`}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
  
          <div className="flex flex-col">
            <p className="body-bold">Name</p>
            <p className="small-regular text-light-3">@{userData?.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button className="shad-button_ghost">Logout</Button>
    </nav>
  );
};

export default LeftSidebar;
