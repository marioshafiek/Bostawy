//Router
import { Outlet } from "react-router-dom";
//Components
import Header from "../../componentes/shared/Header";
import Footer from "../../componentes/shared/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
        <Header />
        <main className="flex-1 p-4  md:p-10 md:m-0">
            <Outlet />
        </main>
        <Footer />
  </div>
  );
};

export default MainLayout;