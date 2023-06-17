import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";

const PopularInstructor = () => {
    const { data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await fetch('https://sportify-camp-server-kazimahin68.vercel.app/users/popular')
            return res.json();
        }
    })
    // console.log(instructors)
    return (
        <div className="md:w-4/5 mx-auto mb-12 mt-24">
            <h2 className="uppercase text-2xl lg:text-4xl font-bold text-center mb-2 text-orange-600">Top 6 Popular Class</h2>
            <hr className="mb-10 border-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                <Fade cascade>
                    {instructors.map((instructor) => (
                        <div key={instructor._id}
                            className="card shadow-x border-orange-600 border-2 p-5">
                            <img className="rounded-full h-24 w-24 mx-auto" src={instructor.userPhoto} alt="" />
                            <div className="card-body">
                                <h2 className="card-title font-extrabold capitalize">{instructor.userName}</h2>
                                <div>
                                    <p className="font-bold">Instructor Email: {instructor.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Fade>
            </div>
        </div>
    );
};

export default PopularInstructor;