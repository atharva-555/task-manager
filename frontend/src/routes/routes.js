import { Routes,Route } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import TaskCard from "../components/Tasks/TaskCard.jsx";
// import Login_test from "./pages/Login_.jsx";
import Test from "../pages/Test.jsx";
import ProtectedRoute from "./RoleBasedRoute.js";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import UserDashboard from "../pages/UserDashboard.jsx";
import Spinner, { ButtonSpinner } from "../components/UI/Spinner.jsx";
// import PageSpinner from "../components/UI/Spinner.jsx";


export default function AppRoutes() {
    return (
        <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<LandingPage />} />
                    

                    {/* TEST ROUTES */}
                     <Route path="/test-spinner" element={<Spinner color="primary" fullScreen size="2xl" />} />
                     <Route path="/test" element={<Test />} />
                     <Route path= "taskCard" element={<TaskCard />} />

                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path= "/register" element={<Register />} />

                    {/* Protected Routes */}
                    {/* ADMIN ONLY */}
                    <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>}/>
                    
                    {/* USER ONLY */}
                    <Route path="/dashboard/user" element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />

                    {/* <Route path="/testlogin" element={<Login_test />} /> */}
                </Route>

        </Routes>
    );
}
