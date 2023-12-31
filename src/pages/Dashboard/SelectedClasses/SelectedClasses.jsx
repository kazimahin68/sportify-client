import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const SelectedClasses = () => {

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: SelectedClasses = [], refetch } = useQuery(['selected'], async () => {
        const res = await axiosSecure.get(`/classes/selected/${user.email}`)
        return res.data;
    })
    // console.log(SelectedClasses);


    const handleDelete = classItem => {
        // console.log(classItem._id)
        Swal.fire({
            title: 'Are you sure?',
            text: "Remove it from selected items",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/classes/selected/${classItem._id}`)
                    .then(res => {
                        console.log("delete res", res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Removed!',
                                'Your class has been removed.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <>
            <Helmet>
                <title>Sportify Camp || Selected Class</title>
            </Helmet>
            <div className="w-3/4 mx-auto mt-12 bg-slate-200 shadow-md rounded p-5">
                <h2 className="text-center text-orange-600 font-bold text-3xl my-5">Selected Classes</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-orange-600 text-xl">
                                <th>#</th>
                                <th>Class Name</th>
                                <th>Instructor Name</th>
                                <th>Available Seats</th>
                                <th>Pay</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                SelectedClasses.map((classItem, index) => <tr key={classItem._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td className="capitalize font-bold">{classItem.className}</td>
                                    <td className="capitalize font-bold">{classItem.instructorName}</td>
                                    <td className="capitalize font-bold">{classItem.seats}</td>
                                    <td>

                                        <Link to={`/dashboard/payment/${classItem._id}`}><button
                                            className="btn hover:bg-orange-500 btn-sm"
                                        >
                                            Pay
                                        </button></Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(classItem)}
                                            className="btn hover:bg-orange-500 btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
};

export default SelectedClasses;