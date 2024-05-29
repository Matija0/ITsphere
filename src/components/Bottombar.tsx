import { bottombarLinks } from "@/constants/links";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";


const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive && "rounded-[10px] bg-primary-500 "
            } flex-center flex-col gap-1 p-2 transition`}>

            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
}

export default Bottombar