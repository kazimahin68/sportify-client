import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useInstructor from "../../../hooks/useInstructor";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyClasses = () => {

    const { user } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const [axiosSecure] = useAxiosSecure();

    if (isInstructorLoading) {
        <PulseLoader
            className="text-center mt-20"
            color={'#36d7b7'}
            loading={isInstructorLoading}
            // cssOverride={override}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        enabled: isInstructor,
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/user/${user.email}`);
            return res.data
        }
    })
    console.log(classes);
    return (
        <>
            <Helmet>
                <title>Sportify Camp || My classes</title>
            </Helmet>
            <div className="w-full mx-auto bg-slate-200 p-5">
                <h2 className="text-center text-orange-600 font-bold text-3xl my-5">All Classes</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-orange-600 text-xl">
                                <th>#</th>
                                <th>Class Photo</th>
                                <th>Class Name</th>
                                <th>Status</th>
                                <th>Enrolled</th>
                                <th>Update</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                classes.map((classItem, index) => <tr key={classItem._id}>
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
                                        {classItem.status}
                                    </td>
                                    <td>{classItem.enrolled} Students</td>
                                    <td><div className="btn-group btn-group-vertical">
                                        <Link to={`/dashboard/update-class/${classItem._id}`}>
                                            <button className="btn btn-xs  hover:bg-orange-500">Update</button></Link>
                                    </div></td>
                                    <td>{classItem?.feedback}</td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default MyClasses;