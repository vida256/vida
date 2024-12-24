import { Home } from "@/pages";
import AboutUs from "./pages/AboutUs";
import PartnersScreen from "./pages/PartnersScreen";

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
    name: "Partners",
    path: "/partners",
    element: <PartnersScreen />
  },
  {
    name: "Projects",
    path: "/projects",
    element: <Home />
  },
  {
    name: "Gallery",
    path: "/gallery",
    element: <Home />
  }
];

export default routes;