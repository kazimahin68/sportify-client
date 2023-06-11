import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {

    const { googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                const saveUser = { userName: loggedUser.displayName, email: loggedUser.email, userPhoto: loggedUser.photoURL }
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })
            })
    }


    return (
        <div>
            <div className="w-full text-center my-4">
                <button onClick={handleGoogleSignIn} className="btn btn-circle bg-orange-600 hover:bg-green-500 text-white hover:text-red-600 font-bold">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default SocialLogin;