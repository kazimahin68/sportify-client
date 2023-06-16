import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashBoard from "../layout/DashBoard";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import AddAClass from "../pages/Dashboard/AddAClass/AddAClass";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import SelectedClasses from "../pages/Dashboard/SelectedClasses/SelectedClasses";
import Payment from "../pages/Dashboard/Payment/Payment";
import EnrolledClasses from "../pages/Dashboard/EnrolledClasses/EnrolledClasses";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: 'selected-classes',
                element: <SelectedClasses></SelectedClasses>
            },
            {
                path: 'enrolled-classes',
                element: <EnrolledClasses></EnrolledClasses>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            },
            // Admin Route
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'all-classes',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },

            // Instructor Route
            {
                path: 'add-class',
                element: <InstructorRoute><AddAClass></AddAClass></InstructorRoute>
            }
        ]
    }
])

export default router;