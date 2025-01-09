import Navbar from "../Dashboard/Navbar";
import SideBar from "../Dashboard/SideBar";

const Layout = ({ children }: any) => {
  return (
    <div className="h-screen overflow-hidden w-screen relative">
      <Navbar />
      <div className="lg:flex flex-row justify-start w-full">
        <div className="xs:max-lg:hidden ">
          <SideBar />
        </div>
        <div className="flex flex-col !h-[calc(100vh-52px)] overflow-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
