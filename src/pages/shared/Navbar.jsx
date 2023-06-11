import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    // console.log(user)

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const [isSticky, setIsSticky] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])
    const isAdmin = true;
    const navItems = <>
        <li className="font-bold"><Link>Home</Link></li>
        <li className="font-bold"><Link>Instructor</Link></li>
        <li className="font-bold"><Link>Classes</Link></li>
        {/* {user && <li className="font-bold"><Link>Dashboard</Link></li>} */}
        {user && isAdmin && <li className="font-bold"><Link>Dashboard</Link></li>}
        {/* {user && <li className="font-bold"><Link>Dashboard</Link></li>} */}
    </>

    return (
        <div className={`navbar bg-blue-500 bg-opacity-30 text-orange-600 transition-all duration-1000 ${isSticky ? "fixed top-0 left-0 w-full z-50 transition duration-500" : "relative transition duration-500"}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Sportify Camp</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user && <img className="rounded-full w-12 mr-4" src={user?.photoURL} alt="" title={user?.displayName} />}
                {user ? <button onClick={handleLogout} className="btn bg-orange-600 font-bold hover:bg-green-500 border-none text-white">Logout</button> : <Link to="/login" className="btn bg-orange-600 font-bold hover:bg-green-500 border-none text-white">Login</Link>}
            </div>
        </div>
    );
};

export default Navbar;