import { useQuery } from "@tanstack/react-query";
import { Slide } from "react-awesome-reveal";


const PopularClass = () => {
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/classes/popular')
            return res.json();
        }
    })
    // console.log(classes)
    return (
        <div className="md:w-4/5 mx-auto mb-12 mt-24">
            <h2 className="uppercase text-4xl font-bold text-center mb-2 text-orange-600">Top 6 Popular Class</h2>
            <hr className="mb-10 border-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                <Slide cascade>
                    {classes.map((classItem) => (
                        <div key={classItem._id}
                            className={`card bg-base-100 shadow-xl h-[670px] ${classItem.seats === 0 && 'bg-red-600'}`}>
                            <figure><img className="h-[320px]" src={classItem.classImage} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title font-extrabold">{classItem.className}</h2>
                                <div className="mb-5">
                                    <p className="font-bold">Instructor Name: {classItem.instructorName}</p>
                                    <p className="font-bold">Available Seats: {classItem.seats}</p>
                                    <p className="font-bold mt-5"><span className="text-xl">Price: </span> {classItem.price} $</p>
                                    <p className="font-bold mt-5"><span className="text-xl">Enrolled Student: </span> {classItem.enrolled}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>
        </div>
    );
};

export default PopularClass;