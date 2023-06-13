import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useInstructor from "../../hooks/useInstructor";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const Instructors = () => {
    const [axiosSecure] = useAxiosSecure();
    const [isInstructor] = useInstructor();
    const { loading } = useAuth();
  

        const { data: instructors = [] } = useQuery(["isInstructor"], async () => {
            const res = await axiosSecure.get('/users/instructors')
            return res.data
        },
            {
                enabled: !isInstructor,
            })
        // console.log(instructors)

    if (loading) {
        return (
            <PulseLoader
                className="text-center mt-20"
                color={'#36d7b7'}
                loading={loading}
                // cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        )
    }

    return (
        <div className="w-3/4 mx-auto mt-12  bg-blue-500 bg-opacity-30 rounded-lg p-10">
            <div className="overflow-x-auto">
                <table className="table border-4">
                    {/* head */}
                    <thead>
                        <tr className="text-orange-600 text-xl">
                            <th>#</th>
                            <th>Instructor Photo</th>
                            <th>Name</th>
                            <th>Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            instructors.map((instructor, index) => <tr key={instructor._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-24 h-24">
                                            <img src={instructor.userPhoto} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td className="capitalize font-bold">{instructor.userName}</td>
                                <td className= "font-bold">{instructor.email}</td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Instructors;