import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from 'moment';
moment().format();

const EnrolledClasses = () => {

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: enrolledClass = [] } = useQuery(['enrolled'], async () => {
        const res = await axiosSecure.get(`/payments/enrolled/${user?.email}`)
        return res.data;
    })
    console.log(enrolledClass)
    return (
        <div className="w-3/4 mx-auto mt-12 bg-slate-200 shadow-md rounded mb-12">
            <h2 className="text-center text-orange-600 font-bold text-3xl my-5">All Enrolled Classes</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-orange-600 text-xl">
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Transaction Id</th>
                            <th>Price</th>
                            <th>Enrolled Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            enrolledClass.map((classItem, index) => <tr key={classItem._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td className="capitalize font-bold">{classItem.className}</td>
                                <td className="capitalize font-bold">{classItem.transactionId}</td>
                                <td className="capitalize font-bold">{classItem.price}</td>
                                <td>
                                    {moment(classItem.date).format("LLL")}
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default EnrolledClasses;