import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ManageClasses = () => {

    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = axiosSecure.get('/all-classes')
        return (await res).data;
    })
    // console.log(classes)
    const handleApprove = item => {
        axiosSecure.patch(`/classes/status/${item._id}`, { status: 'approved' })
            .then(res => {
                refetch();
                console.log(res.data)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `${item.className} is approved`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleDenied = classItem => {
        axiosSecure.patch(`/classes/status/${classItem._id}`, { status: 'denied' })
            .then(res => {
                refetch();
                if (res.data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `${classItem.className} is denied`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <>
            <Helmet>
                <title>Sportify Camp || Manage User</title>
            </Helmet>
            <div className="w-full mx-auto mt-12 bg-slate-200">
                <h2 className="text-center text-orange-600 font-bold text-3xl my-5">All Classes</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-orange-600 text-xl">
                                <th>#</th>
                                <th>Class Photo</th>
                                <th>Class Name</th>
                                <th>Instructor</th>
                                <th>Available seats</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                classes.map((classItem, index) => <tr key={`${classItem._id}-${index}`}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-24 h-24">
                                                <img src={classItem.classImage} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="capitalize font-bold">{classItem.className}</td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span>Name: {classItem.instructorName}</span>
                                            <span>Email: {classItem.instructorEmail}</span>
                                        </div>
                                    </td>
                                    <td>{classItem.seats}</td>
                                    <td>${classItem.price}</td>
                                    <td>
                                        {classItem.status}
                                    </td>
                                    <td><div className="btn-group btn-group-vertical">
                                        <button className="btn btn-xs  hover:bg-orange-500" disabled={classItem.status === 'approved' || classItem.status === 'denied'} onClick={() => handleApprove(classItem)}>Approved</button>
                                        <button className="btn btn-xs  hover:bg-orange-500" disabled={classItem.status === 'approved' || classItem.status === 'denied'} onClick={() => handleDenied(classItem)}>Denied</button>
                                        <Link to={`/dashboard/feedback/${classItem._id}`}>
                                            <button className="btn btn-xs  hover:bg-orange-500">FeedBack</button></Link>
                                    </div></td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageClasses;