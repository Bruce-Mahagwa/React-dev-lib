// files
import NavigationPage from "../Navigation/NavigationPage"
import FooterPage from "../Footer/FooterPage";
import BannerPage from "../Banner/BannerPage"
// dependencies
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <main id = "main_layout">
      <NavigationPage />
      <BannerPage />
      <Outlet />
      <FooterPage /> 
    </main>
  )
}
export default Layout