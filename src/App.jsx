// App.jsx
import routes from "@/routes";
import Navbar from "@/widgets/layout/navbar";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar routes={routes} />
      <main className="pt-16"> 
        <Routes>
          {routes.map(({ path, element }, key) =>
            element ? <Route key={key} exact path={path} element={element} /> : null
          )}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
