import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const Feedback = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        axiosSecure.patch(`/classes/feedback/${id}`, { feedback: data.feedback })
            .then(res => {
                reset();
                // console.log(res.data)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your feedback is successfully send',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        console.log(data.feedback)
    }
    return (
        <>
            <Helmet>
                <title>Sportify Camp || Feedback</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className="hero">
                <div className="hero-content w-full">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Your Feedback</span>
                                </label>
                                <textarea  {...register("feedback", { required: "Feedback is required" })} className="textarea textarea-bordered h-24" placeholder="Write your feedback"></textarea>
                                {errors.feedback && <p className="text-red-600" role="alert">{errors.feedback?.message}</p>}
                            </div>
                            <div className="form-control">
                                <button type="submit" className="btn hover:bg-orange-600">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form></>
    );
};

export default Feedback;