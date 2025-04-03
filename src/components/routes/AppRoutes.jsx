import { lazy,Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
const NotFound =lazy(()=>import("../notfound/notfound"));
const HomeIndex= lazy(()=>import("../../pages/Home"));
const BlogIndex=lazy(()=>import("../../pages/Blogs"));
const TaskIndex= lazy(()=>import("../../pages/Tasks"));
const BlogDetails= lazy(()=>import("../../pages/Blogs/BlogsDetails"));
const CalculatorIndex =lazy(()=>import("../../pages/Calculator"));
const Login=lazy(()=>import("../../pages/Login/login"));
const Dashboard =lazy(()=>import("../../pages/Dashboard/Dashboard"));
const ChangePassword = lazy(() => import
("../changePassword/ChangePassword"));
const AboutUs = lazy(() => import
("../../pages/AboutUs/AboutUs"));
const UserProfile = lazy(() => import
("../../pages/UserProfile/UserProfile"));
const AppRoutes=()=>{
return(
    <Suspense fallback={<div>Loading</div>}>
    <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* Routes accessible by everyone */}
        <Route path="/" element={<HomeIndex />} />
        <Route path="/home" element={<HomeIndex />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/task" element={<TaskIndex />} />
        <Route path="/calculator" element={<CalculatorIndex />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

    </Suspense>
)
}

export default AppRoutes;