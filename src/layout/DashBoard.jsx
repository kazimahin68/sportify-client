import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useAuth from "../hooks/useAuth";
import { FaWallet, FaHome, FaUtensils, FaBook, FaBookmark, FaBookOpen, FaUserCog, FaUserEdit, FaEdit, FaBars } from 'react-icons/fa';

const DashBoard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { user } = useAuth();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn bg-orange-600 hover:bg-green-600 drawer-button lg:hidden"><FaBars></FaBars></label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay mt-0"></label>
                <ul className="menu p-4 w-72 h-full bg-base-200 pt-10">
                    {/* Sidebar content here */}

                    {/* Admin Sidebar */}
                    {isAdmin &&
                        <>
                            <li className="font-bold"><NavLink to="/dashboard/all-users"><FaUserEdit></FaUserEdit>Manage Users</NavLink></li>
                            <li className="font-bold"><NavLink to="/dashboard/all-classes"><FaEdit></FaEdit>Manage Classes</NavLink></li>
                        </>
                    }

                    {/* Instructor Sidebar */}
                    {
                        isInstructor && <>
                            <li className="font-bold"><NavLink to="/dashboard/add-class"><FaUtensils></FaUtensils>Add A Class</NavLink></li>
                            <li className="font-bold"><NavLink to="/dashboard/my-classes"><FaBook></FaBook>My Classes</NavLink></li>
                        </>
                    }

                    {/* User Sidebar */}
                    {
                        user && !isAdmin && !isInstructor && <>
                            <li className="font-bold"><NavLink to='/dashboard/selected-classes'><FaBookmark></FaBookmark> My Selected Classes</NavLink></li>
                            <li className="font-bold"><NavLink to='/dashboard/enrolled-classes'><FaWallet></FaWallet> My Enrolled Classes</NavLink></li>
                        </>
                    }

                    <div className="divider my-10"></div>
                    {/* Common Sidebar */}
                    <li className="font-bold"><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                    <li className="font-bold"><Link to="/instructors"><FaUserCog></FaUserCog>Instructor</Link></li>
                    <li className="font-bold"><Link to="/classes"><FaBookOpen></FaBookOpen>Classes</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;