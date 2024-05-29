import Bottombar from "@/components/Bottombar";
import LeftSidebar from "@/components/LeftSidebar";
import Topbar from "@/components/Topbar";


const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        {children}
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;