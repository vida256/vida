import routes from "@/routes";
import Navbar from "@/widgets/layout/navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import PageBuilder from "./builder/PageBuilder";
import ContactPage from "./pages/contactUs";
import DynamicProjectPage from "./pages/DynamicProjectPage";

function App() {
  return (
    <>
      <Navbar routes={routes} />
      <main className="pt-16">
        <Routes>
          {/* Regular routes from routes.js */}
          {routes.map(({ path, element }, key) =>
            element ? <Route key={key} exact path={path} element={element} /> : null
          )}
          
          {/* Additional routes */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<PageBuilder />} />
          <Route path="/programs/:slug" element={<DynamicProjectPage />} />
          
          {/* Redirect to root instead of /home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;