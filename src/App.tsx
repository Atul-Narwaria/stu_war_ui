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
const AdminStudent = lazy(() => import("./pages/admin/student/Student"));
const AdminStudentCreate = lazy(
  () => import("./pages/admin/student/StudentCreate")
);
const InstIndex = lazy(() => import("./pages/institute/Index"));
const InstHome = lazy(() => import("./pages/institute/Home"));
const InstStudent = lazy(() => import("./pages/institute/student/Student"));
const InstStudentCreate = lazy(
  () => import("./pages/institute/student/Create")
);
const InstStudentEdit = lazy(() => import("./pages/institute/student/Edit"));
const InstTeacher = lazy(() => import("./pages/institute/teacher/Teacher"));
const InstTeacherCreate = lazy(() => import("./pages/institute/teacher/Create"));
const InstTeacherEdit = lazy(() => import("./pages/institute/teacher/Edit"));
const InstCourse = lazy(() => import("./pages/institute/course/Course"));
const InstCourseCreate = lazy(() => import("./pages/institute/course/CourseCreate"));
const InstCourseEdit = lazy(() => import("./pages/institute/course/CourseEdit"));
const InstSubCourse = lazy(() => import("./pages/institute/course/sub-course/SubCourse"));
const InstSubCourseCreate = lazy(() => import("./pages/institute/course/sub-course/SubCourseCreate"));
const InstSubCourseEdit = lazy(() => import("./pages/institute/course/sub-course/SubCourseEdit"));
const InstBatch = lazy(() => import("./pages/institute/batch/Batch"));
const InstCourseLink = lazy(() => import("./pages/institute/course/CourseLink"));
const InstCourseSubCourseView = lazy(() => import("./pages/institute/course/SubCourseView"));
const InstBatchCreate = lazy(() => import("./pages/institute/batch/BatchCreate"));
const InstBatchEdit = lazy(() => import("./pages/institute/batch/BatchEdit"));
const InstBatchStudent = lazy(() => import("./pages/institute/batch/BatchStudent"));
const InstBatchStudentAdd = lazy(() => import("./pages/institute/batch/BatchStudentAdd"));
const InstStundetCourse = lazy(() => import("./pages/institute/course/student/CourseStudent"));
const InstStundetCourseCreate = lazy(() => import("./pages/institute/course/student/AddStudentCourse"));

const TeacherIndex = lazy(() => import("./pages/teacher/Index"));
const TeacherHome = lazy(() => import("./pages/teacher/Home"));
const TeacherBatchAssignmentUpload = lazy(() => import("./pages/teacher/assignment/BatchAssignmentUpload"));
const TeacherZooom = lazy(() => import("./components/Zoom/TeacherZoom"));
const TeacherBatches = lazy(() => import("./pages/teacher/Batches"));
const TeacherBatchesAssignment = lazy(() => import("./pages/teacher/assignment/BatchAssignments"));
const TeacherBatchesAssignmentEdit = lazy(() => import("./pages/teacher/assignment/BatchAssinmentEdit"));

const StudentZooom = lazy(() => import("./components/Zoom/StudentZoom"));
const StudentZoomComponent = lazy(() => import("./components/Zoom/StudentZoomComponent"));
const StudentIndex = lazy(() => import("./pages/student/Index"));
const StudentHome = lazy(() => import("./pages/student/Home"));
const StudentBatchs = lazy(() => import("./pages/student/BatchesStudent"));
const StudentBatchsAssignment = lazy(() => import("./pages/student/BatchAssignmentStudent")); 
const StudentBatchsUploadAssignment = lazy(() => import("./pages/student/BatchAssignmentStudentUpload"));


function App() {
  const isAdmin = useSelector((state: any) => state.auth.isLoggedIn);
  const isinstituteLogin = useSelector(
    (state: any) => state.auth.isInstituteLogin
  );
  const isTeacherLogin = useSelector(
    (state: any) => state.auth.isTeacherLogin
  );
  const isStudentLogin = useSelector(
    (state: any) => state.auth.isStudentLogin
  );
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
              path="students"
              element={isAdmin ? <AdminStudent /> : <WebHome />}
            />
            <Route
              path="student/create"
              element={isAdmin ? <AdminStudentCreate /> : <WebHome />}
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
            <Route
              path="teacher"
              element={isinstituteLogin ? <InstTeacher /> : <WebHome />}
            />
            <Route
              path="teacher/create"
              element={isinstituteLogin ? <InstTeacherCreate /> : <WebHome />}
            />
            <Route
              path="teacher/edit/:id"
              element={isinstituteLogin ? <InstTeacherEdit /> : <WebHome />}
            />
            <Route 
            path="course"
            element={isinstituteLogin ? <InstCourse /> : <WebHome />}
            /> 
            <Route 
            path="course/course_link"
            element={isinstituteLogin ? <InstCourseLink /> : <WebHome />}
            />
             <Route 
            path="course/create"
            element={isinstituteLogin ? <InstCourseCreate /> : <WebHome />}
            />
             <Route 
            path="course/edit/:id"
            element={isinstituteLogin ? <InstCourseEdit /> : <WebHome />}
            />
            <Route 
            path="course/sub-course"
            element={isinstituteLogin ? <InstSubCourse /> : <WebHome />}
            />
             <Route 
            path="course/sub-course/view/:id"
            element={isinstituteLogin ? <InstCourseSubCourseView /> : <WebHome />}
            />
             <Route 
            path="course/sub-course/create"
            element={isinstituteLogin ? <InstSubCourseCreate /> : <WebHome />}
            />
             <Route 
            path="course/sub-course/edit/:id"
            element={isinstituteLogin ? <InstSubCourseEdit /> : <WebHome />}
            />
            <Route 
            path="course/student/:id"
            element={isinstituteLogin ? <InstStundetCourse /> : <WebHome />}
            />
              <Route 
            path="course/student/create"
            element={isinstituteLogin ? <InstStundetCourseCreate /> : <WebHome />}
            />
              <Route 
            path="batch"
            element={isinstituteLogin ? <InstBatch /> : <WebHome />}
            />
            <Route 
            path="batch/create"
            element={isinstituteLogin ? <InstBatchCreate /> : <WebHome />}
            />
            <Route 
            path="batch/edit/:id"
            element={isinstituteLogin ? <InstBatchEdit /> : <WebHome />}
            />
             <Route 
            path="batch/students/:id"
            element={isinstituteLogin ? <InstBatchStudent /> : <WebHome />}
            />
             <Route 
            path="batch/students/add/:id"
            element={isinstituteLogin ? <InstBatchStudentAdd /> : <WebHome />}
            />

         

          </Route>
          <Route
              path="/teacher/zoom_class/:meeting/:password"
              element={isTeacherLogin ? <TeacherZooom /> : <WebHome />}
            />
          <Route
            path="/teacher"
            element={isTeacherLogin ? <TeacherIndex /> : <WebHome />}
          >
            
            <Route
              index
              element={isTeacherLogin ? <TeacherHome /> : <WebHome />}
            />
            <Route
              path="batches/assignemnt/upload/:batchid"
              element={isTeacherLogin ? <TeacherBatchAssignmentUpload /> : <WebHome />}
            />
             <Route
              path="batches"
              element={isTeacherLogin ? <TeacherBatches /> : <WebHome />}
            />
            <Route
              path="batches/assignment/:id"
              element={isTeacherLogin ? <TeacherBatchesAssignment /> : <WebHome />}
            />
            <Route
              path="batches/assignment/edit/:id"
              element={isTeacherLogin ? <TeacherBatchesAssignmentEdit /> : <WebHome />}
            />
            </Route>
            <Route
              path="/student/zoom_class/:meeting/:password"
              element={isStudentLogin ? <StudentZooom /> : <WebHome />}
            />
              <Route
              path="/student/zoom_class/component/:meeting/:password"
              element={isStudentLogin ? <StudentZoomComponent /> : <WebHome />}
            />
            <Route
            path="/student"
            element={isStudentLogin ? <StudentIndex /> : <WebHome />}
          >
            
            <Route
              index
              element={isStudentLogin ? <StudentHome /> : <WebHome />}
            />
            <Route
              path="batches"
              element={isStudentLogin ? <StudentBatchs /> : <WebHome />}
            />
              <Route
              path="batches/assignment/:id"
              element={isStudentLogin ? <StudentBatchsAssignment /> : <WebHome />}
            />
            <Route
              path="batches/assignment/upload/:id"
              element={isStudentLogin ? <StudentBatchsUploadAssignment /> : <WebHome />}
            />
            </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
