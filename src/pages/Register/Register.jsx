import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../shared/SocialLogin";
import { Helmet } from "react-helmet";
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'

const Register = () => {
    const { createUser, UpdateUserProfile } = useAuth();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = data => {
        console.log(data.email, data.password, data.confirm)
        createUser(data.email, data.password)
            .then(() => {
                // const loggedUser = result.user;
                // console.log(loggedUser)
                console.log(data)


                UpdateUserProfile(data.name, data.photo)
                    .then(() => {
                        const saveUser = { userName: data.name, email: data.email, userPhoto: data.photo, gender: data.gender }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/')
                                }
                            })
                    })
            })
            .catch(error => {
                reset();
                setError(error.message)
            })
    }
    return (
        <>
            <Helmet>
                <title>Sportify Camp || Register</title>
            </Helmet>
            <div className="hero min-h-screen mt-5 mb-5">
                <div className="hero-content flex-col lg:flex-row gap-10 bg-blue-500 bg-opacity-30 rounded-lg p-10">
                    <div className="text-center lg:text-left lg:w-1/2">
                        <img className="rounded-xl" src="https://i.ibb.co/NFnmMcr/sports-tools-53876-138077.png" alt="" />
                    </div>
                    <div className="card w-full shadow-2xl bg-base-100 lg:w-1/2">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h1 className="text-5xl font-bold text-center mb-12 text-orange-600">Register Here</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Your Name</span>
                                </label>
                                <input type="text" placeholder="Type Your Name" className="input input-bordered"  {...register("name", { required: "Your name is required" })} />
                            </div>

                            {/* Photo URL */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photo", { required: "Photo URL is required" })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photo && <p className="text-red-600" role="alert">{errors.photo?.message}</p>}
                            </div>

                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Type Your Email</span>
                                </label>
                                <input type="email" placeholder="Your Email" className="input input-bordered" {...register("email", { required: "Email Address is required" })}
                                    aria-invalid={errors.email ? "true" : "false"} />
                                {errors.email && <p className="text-red-600" role="alert">{errors.email?.message}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input type="password" placeholder="Choose Your Password" className="input input-bordered" {...register("password", {
                                    required: "Password is required",
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })
                                } aria-invalid={errors.password ? "true" : "false"} />
                                {errors.password && <p className="text-red-600" role="alert">{errors.password?.message}</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 12 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase and one special character.</p>}
                            </div>
                            {/* Confirm Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="Confirm Password" className="input input-bordered" {...register("confirm", {
                                    required: "Password is required",
                                    validate: (value) => value === watch('password') || "Password did not match"
                                })
                                } aria-invalid={errors.confirm ? "true" : "false"} />
                                {errors.confirm && <p className="text-red-600" role="alert">{errors.confirm?.message}</p>}
                            </div>

                            {/* Gender Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Gender</span>
                                </label>
                                <select className="input input-bordered pr-4" {...register("gender")}>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <p className="text-red-600">{error}</p>

                            {/* TODO: Phone Number and Address */}
                            {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Phone Number</span>
                            </label>
                            <PhoneInput
                                className="input input-bordered"
                                {...register('phoneNumber', { required: 'Phone number is required' })}
                                error={errors.phoneNumber?.message}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-600" role="alert">
                                    {errors.phoneNumber.message}
                                </p>
                            )}
                        </div> */}
                            <div className="form-control mt-6">
                                <button className="btn bg-orange-600 font-bold hover:bg-green-500 border-none text-white">Register</button>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <SocialLogin></SocialLogin>
                        <p className="text-center mb-5">Already have an account? Please<Link to="/login" className="btn btn-link normal-case no-underline p-2 text-orange-600">Login...</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;