import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../shared/SocialLogin";

const Login = () => {
    const {loggedIn} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(''); 

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        loggedIn(data.email, data.password)
        .then((result) =>{
            console.log(result)
            reset()
            navigate('/');
        })
        .catch(error => {
            reset();
            setError(error.message)
        })
    }
    return (
        <div className="hero min-h-screen mt-5">
            <div className="hero-content flex-col lg:flex-row gap-10 bg-blue-500 bg-opacity-30 rounded-lg p-10">
                <div className="text-center lg:text-left lg:w-1/2">
                    <img className="rounded-xl" src="https://i.ibb.co/NFnmMcr/sports-tools-53876-138077.png" alt="" />
                </div>
                <div className="card w-full shadow-2xl bg-base-100 lg:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className="text-5xl font-bold text-center mb-5 text-orange-600">Login now</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Type Your Email</span>
                            </label>
                            <input type="email" placeholder="Your Email" className="input input-bordered" {...register("email", { required: "Email Address is required" })}
                                aria-invalid={errors.email ? "true" : "false"} />
                            {errors.email && <p className="text-red-600" role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password" className="input input-bordered" {...register("password", { required: "Password is required" })
                            } aria-invalid={errors.password ? "true" : "false"} />
                            {errors.password && <p className="text-red-600" role="alert">{errors.password?.message}</p>}

                            {/* TODO: Forgot password verify */}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <p className="text-red-600">{error}</p>
                        <div className="form-control mt-6">
                            <button className="btn bg-orange-600 font-bold hover:bg-green-500 border-none text-white">Login</button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <SocialLogin></SocialLogin>
                    <p className="text-center mb-5">New ti this site? Please<Link to="/register" className="btn btn-link normal-case no-underline p-2 text-orange-600">Register...</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;