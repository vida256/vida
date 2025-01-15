import { Home } from "@/pages";
import AboutUs from "./pages/AboutUs";
import PartnersScreen from "./pages/PartnersScreen";
import VidaServicesFullScreen from "./pages/Services";

export const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />
  },
  {
    name: "About Us",
    path: "/about",
    element: <AboutUs />
  },
  {
    name: "Services",
    path: "/services",
    element: <VidaServicesFullScreen />
  },
  {
    name: "Partners",
    path: "/partners",
    element: <PartnersScreen />
  },
  {
    name: "Projects",
    path: "/projects",
    element: <Home />
  },
  // {
  //   name: "Contact Us",
  //   path: "/contact",
  //   element: <ContactPage />
  // }
];

export default routes;