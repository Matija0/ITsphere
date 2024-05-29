import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Topbar = () => {
 return(
  <section className="topbar">
  <div className="flex-between py-4 px-5">
    <Link to="/" className="flex gap-3 items-center">
    </Link>

    <div className="flex gap-4">
      <Button variant="ghost" className="shad-button_ghost">Logout</Button>
      <Link to={`/profile`} className="flex-center gap-3">
      </Link>
    </div>
  </div>
</section>
 )
};

export default Topbar;
