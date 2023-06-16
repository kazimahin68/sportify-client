import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { Helmet } from "react-helmet";

const AddAClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const queryClient = useQueryClient();
    // const navigate = useNavigate();
    const [error, setError] = useState('');

    const addClassMutation = useMutation(async (data) => {
        const savedClass = {
            className: data.className,
            classImage: data.classImage,
            instructorName: data.instructorName,
            instructorEmail: data.instructorEmail,
            seats: parseFloat(data.seats),
            price: parseFloat(data.price),
            status: "pending",
        };
        // console.log(savedClass)
        const response = await axiosSecure.post("/classes", savedClass);
        return response.data;
    },
        {
            onSuccess: () => {
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Item added successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                queryClient.invalidateQueries('classes')
            }
        },
        {
            onError: (error) => {
                setError(error)
            }
        });

    const onSubmit = (data) => {
        addClassMutation.mutate(data);
    };


    return (
        <>
            <Helmet>
                <title>Sportify Camp || Add Class</title>
            </Helmet>
            <div className="hero mt-5 mb-5">
                <div className="hero-content bg-blue-500 bg-opacity-30 rounded-lg p-10 w-full lg:w-4/5">
                    <div className="card w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h1 className="text-5xl font-bold text-center mb-12 text-orange-600">Add A Class</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Class Name</span>
                                </label>
                                <input type="text" placeholder="Class Name" className="input input-bordered w-full"  {...register("className", { required: "Class name is required" })} />
                            </div>

                            {/* Photo URL */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Class Image</span>
                                </label>
                                <input type="text"  {...register("classImage", { required: "Photo URL is required" })} placeholder="Photo URL" className="input input-bordered w-full" />
                                {errors.classImage && <p className="text-red-600" role="alert">{errors.classImage?.message}</p>}
                            </div>

                            {/* Instructor Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Your Name</span>
                                </label>
                                <input type="text" defaultValue={`${user.displayName}`} readOnly  {...register("instructorName", { required: "Photo URL is required" })} className="input input-bordered w-full" />
                            </div>

                            {/* Instructor Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Your Email</span>
                                </label>
                                <input type="email" defaultValue={user.email} readOnly className="input input-bordered w-full" {...register("instructorEmail", { required: "Email Address is required" })} />
                            </div>

                            <div className="flex flex-col lg:flex-row gap-x-10 gap-y-3 justify-between">
                                {/* Available Seats */}
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text font-bold">Available Seats</span>
                                    </label>
                                    <input type="number"  {...register("seats", { required: "Seat number is required" })} placeholder="Seat Number" className="input input-bordered w-full" />
                                    {errors.seats && <p className="text-red-600" role="alert">{errors.seats?.message}</p>}
                                </div>
                                {/* Course Price */}
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text font-bold">Enrollment Price</span>
                                    </label>
                                    <input type="number"  {...register("price", { required: "Seat number is required" })} placeholder="Enrollment Price" className="input input-bordered w-full" />
                                    {errors.price && <p className="text-red-600" role="alert">{errors.price?.message}</p>}
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-orange-600 font-bold hover:bg-green-500 border-none text-white">Add Class</button>
                            </div>
                            <p className="text-red-600">{error?.message}</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAClass;