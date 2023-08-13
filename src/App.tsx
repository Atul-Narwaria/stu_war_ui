import { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/web/NotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";

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

const InstIndex = lazy(() => import("./pages/institute/Index"));
const InstHome = lazy(() => import("./pages/institute/Home"));
const InstStudent = lazy(() => import("./pages/institute/student/Student"));
const InstStudentCreate = lazy(
  () => import("./pages/institute/student/Create")
);
const InstStudentEdit = lazy(() => import("./pages/institute/student/Edit"));
function App() {
  const isAdmin = useSelector((state: any) => state.auth.isLoggedIn);
  const isinstituteLogin = useSelector(
    (state: any) => state.auth.isInstituteLogin
  );
  console.log(isinstituteLogin);
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
      <Suspense
        fallback={
          <>
            <div className=" w-full h-[10vh] p-2">
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{ background: "gray", width: 1 }}
                height="9vh"
              />
            </div>
            <div className=" grid h-[87vh] grid-cols-6 gap-2 p-2">
              <div className=" col-span-1">
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{ background: "gray", width: 1 }}
                  height="88vh"
                />
              </div>
              <div className=" col-span-5">
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{ background: "gray", width: 1 }}
                  height="88vh"
                />
              </div>
            </div>
          </>
        }
      >
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

          <Route
            path="/institute"
            element={isinstituteLogin ? <InstIndex /> : <WebHome />}
          >
            <Route
              index
              element={isinstituteLogin ? <InstHome /> : <WebHome />}
            />
            <Route
              path="student"
              element={isinstituteLogin ? <InstStudent /> : <WebHome />}
            />
            <Route
              path="student/create"
              element={isinstituteLogin ? <InstStudentCreate /> : <WebHome />}
            />
            <Route
              path="student/edit/:id"
              element={isinstituteLogin ? <InstStudentEdit /> : <WebHome />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;