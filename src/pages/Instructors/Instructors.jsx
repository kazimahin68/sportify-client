import { useQuery } from "@tanstack/react-query";
import { Fade, } from "react-awesome-reveal";
import { Helmet } from "react-helmet";

const Instructors = () => {
    const { data: instructors = [] } = useQuery({
        queryKey: ['instructor'],
        queryFn: async () => {
            const res = await fetch('https://sportify-camp-server-kazimahin68.vercel.app/instructors')
            return res.json();
        }
    })
    // console.log(instructors)

    return (
        <>
            <Helmet>
                <title>Sportify Camp || Instructors</title>
            </Helmet>
            <div className="w-3/4 mx-auto mt-12  bg-blue-500 bg-opacity-30 rounded-lg p-10">
                <h2 className="text-center text-orange-600 font-bold text-2xl lg:text-5xl mb-10">Our all instructors information</h2>
                <Fade duration={3000} cascade delay={100}>

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
                                        <td className="font-bold">{instructor.email}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </Fade>
            </div>
        </>
    );
};

export default Instructors;