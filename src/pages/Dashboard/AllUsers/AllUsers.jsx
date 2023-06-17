import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    }
    )
    // console.log(users)

    const handleMakeAdmin = user => {
        console.log(user)
        fetch(`https://sportify-camp-server-kazimahin68.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `${user.userName} is admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleMakeInstructor = (user) => {
        fetch(`https://sportify-camp-server-kazimahin68.vercel.app/users/instructors/${user._id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: "success",
                        title: `${user.userName} is instructor now`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            });
    };
    const getFilteredUsers = () => {
        return users.filter((user) => !user.role);
    };
    return (
        <>
        <Helmet>
            <title>Sportify Camp || All students</title>
        </Helmet>
            <div className="w-3/4 mx-auto mt-12 bg-slate-200 p-5">
                <h2 className="text-center text-orange-600 font-bold text-3xl my-5">All Users (Only Students)</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-orange-600 text-xl">
                                <th>#</th>
                                <th>Profile Picture</th>
                                <th>Name</th>
                                <th>Make Admin</th>
                                <th>Make Instructor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                getFilteredUsers().map((user, index) => <tr key={user._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.userPhoto} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="capitalize font-bold">{user.userName}</td>
                                    <td>
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn hover:bg-orange-500 btn-sm"
                                            disabled={user.role === "admin"}
                                        >
                                            Make Admin
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleMakeInstructor(user)}
                                            className="btn hover:bg-orange-500 btn-sm"
                                            disabled={user.role === "instructor"}
                                        >
                                            Make Instructor
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default AllUsers;