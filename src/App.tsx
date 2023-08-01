import { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/web/NotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Home = lazy(() => import("./pages/admin/Home"));
const AdminIndex = lazy(() => import("./pages/admin/Index"));
const AdminInstitute = lazy(() => import("./pages/admin/institute/Institute"));
const AdminLocation = lazy(() => import("./pages/admin/Location"));
const WebHome = lazy(() => import("./pages/web/Home"));
const AdminLocationCountry = lazy(
  () => import("./pages/admin/location/Country")
);
const AdminLocationState = lazy(() => import("./pages/admin/location/State"));
const AdminLocationCity = lazy(() => import("./pages/admin/location/City"));

function App() {
  const isAdmin = useSelector((state: any) => state.auth.admin);
  console.log(isAdmin);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 750) {
      setOpen(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {/* <Routes>
    <Route path="/" element={<WebHome />} />
    </Routes> */}
      <ToastContainer />
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path="/" element={<WebHome />} />
          <Route path="404" element={<NotFound />} />
          <Route path="/admin" element={isAdmin ? <AdminIndex /> : <WebHome />}>
            <Route index element={isAdmin ? <Home /> : <WebHome />} />
            <Route
              path="institute"
              element={isAdmin ? <AdminInstitute /> : <WebHome />}
            />
            <Route
              path="location"
              element={isAdmin ? <AdminLocation /> : <WebHome />}
            />
            <Route
              path="location/country"
              element={isAdmin ? <AdminLocationCountry /> : <WebHome />}
            />
            <Route
              path="location/state"
              element={isAdmin ? <AdminLocationState /> : <WebHome />}
            />
            <Route
              path="location/city"
              element={isAdmin ? <AdminLocationCity /> : <WebHome />}
            />
            <Route
              path="coordinator"
              element={isAdmin ? <Home /> : <WebHome />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
