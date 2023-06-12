import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation();
    if (loading) {
        return (
            <PulseLoader
                className="text-center mt-20"
                color={'#36d7b7'}
                loading={loading}
                // cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        )
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }}></Navigate>
}
export default PrivateRoute;