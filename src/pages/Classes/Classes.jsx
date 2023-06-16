import { useQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";

const Classes = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/classes');
            return res.json();
        },
    });

    // console.log(classes);

    if (isLoading) {
        return (
            <div className="text-center mt-20">
                <PulseLoader color={'#36d7b7'} loading={isLoading} size={10} />
            </div>
        );
    }

    const handleSelection = id => {
        if(!user){
            toast('You have to login first to enroll');
            navigate('/login');
            return
        }
        const selectedClass = classes.find(classItem => classItem._id === id);
        selectedClass.studentEmail = user.email;
        // console.log(selectedClass)
        axiosSecure.post('/classes/selected', selectedClass)
        .then(data => {
            if(data.data.insertedId){
                Swal.fire({
                    icon: 'success',
                    title: 'Your class is successfully selected',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            else if(data.data.message === "already selected"){
                toast.error('This class has already been selected')
            }
            console.log(data)
        })

    }

    return (
        <div className="md:w-4/5 mx-auto mb-12 mt-12">
            <h2 className="uppercase text-4xl font-bold text-center mb-12">All Classes are here</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {classes.map((classItem) => (
                    <div key={classItem._id} className={`card bg-base-100 shadow-xl ${classItem.seats === 0 && 'bg-red-600'}`}>
                        <figure><img className="h-80" src={classItem.classImage} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title font-extrabold">{classItem.className}</h2>
                            <div className="mb-5">
                                <p className="font-bold">Instructor Name: {classItem.instructorName}</p>
                                <p className="font-bold">Available Seats: {classItem.seats}</p>
                                <p className="font-bold mt-5"><span className="text-xl">Price: </span> {classItem.price} $</p>
                            </div>
                            <div className="card-actions justify-center mt-5">
                                <button onClick={() => handleSelection(classItem._id)} disabled={isAdmin || isInstructor || classItem.seats === 0} className="btn bg-orange-600 font-bold hover:bg-green-500 border-none text-white absolute bottom-4">Enroll</button>
                                <Toaster></Toaster>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;