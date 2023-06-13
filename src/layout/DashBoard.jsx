import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useAuth from "../hooks/useAuth";

const DashBoard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const {user} = useAuth();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}

                    {/* Admin Sidebar */}
                    { isAdmin &&
                        <li><Link to="/dashboard/all-users">Manage Users</Link></li>
                    }

                    {/* Instructor Sidebar */}
                    {
                       isInstructor && <li><Link to="/dashboard/add-class">Add A Class</Link></li>
                    }

                    {/* User Sidebar */}
                    {
                       user && !isAdmin && !isInstructor && <>
                       <li><Link to='/dashboard/selected-classes'>My Selected Classes</Link></li>
                       </> 
                    }

                    {/* Common Sidebar */}
                    <li><Link to='/'>Home</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;