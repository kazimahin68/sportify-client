import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
    }
    return (
        <div className="hero min-h-screen mt-5">
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
                            <input type="text" placeholder="Type Your Name" className="input input-bordered"  {...register("name", { required: "Your Name is required" })} />
                        </div>
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
                            <input type="password" placeholder="Choose Your Password" className="input input-bordered" {...register("password", {
                                required: "Password is required",
                                minLength: 6,
                                maxLength: 12,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                            })
                            } aria-invalid={errors.password ? "true" : "false"} />
                            {errors.password && <p className="text-red-600" role="alert">{errors.password?.message}</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 12 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase and one special character.</p>}
                        </div>
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
                    <p className="text-center mb-5">Already have an account? Please<Link to="/login" className="btn btn-link normal-case no-underline p-2 text-orange-600">Login...</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;