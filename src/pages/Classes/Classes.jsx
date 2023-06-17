import { useQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import { useState } from "react";
import { Roll, Slide } from "react-awesome-reveal";
import { Helmet } from "react-helmet";

const Classes = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState([]);
    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch('https://sportify-camp-server-kazimahin68.vercel.app/classes');
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

    const handleSelection = classItem => {
        console.log(classItem)
        if (!user && user.email) {
            toast('You have to login first to enroll');
            navigate('/login');
            return
        }
        const selectedClassItem = { classId: classItem._id, className: classItem.className, instructorName: classItem.instructorName, seats: classItem.seats, studentEmail: user?.email, price: classItem.price }
        // const selectedClass = classes.find(classItem => classItem._id === id);
        // selectedClass.classItemId = classes.map(item => item._id);
        // selectedClass.studentEmail = user.email;
        // console.log(selectedClass)
        axiosSecure.post('/classes/selected', selectedClassItem)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your class is successfully selected',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setSelectedClass(prevSelectedClasses => [
                        ...prevSelectedClasses,
                        classItem._id
                    ]);
                }
                // else if(data.data.message === "already selected"){
                //     toast.error('This class has already been selected')
                // }
                // console.log(data)
            })

    }
    const isSelected = classId => {
        return selectedClass.includes(classId);
    };

    return (
        <>
            <Helmet>
                <title>Sportify Camp || Classes</title>
            </Helmet>
            <div className="md:w-4/5 mx-auto mb-12 mt-12">
                <Slide direction="down" duration={1000}>
                    <h2 className="uppercase text-4xl font-bold text-center mb-2 text-orange-600">All Classes are here</h2>
                </Slide>
                <hr className="mb-10 border-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    <Roll cascade delay={0} damping={2e-1}>
                        {classes.map((classItem) => (
                            <div key={classItem._id} className={`card bg-base-100 h-[670px] shadow-xl ${classItem.seats === 0 && 'bg-red-600'}`}>
                                <figure><img className="h-80" src={classItem.classImage} alt="" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title font-extrabold">{classItem.className}</h2>
                                    <div className="mb-5">
                                        <p className="font-bold">Instructor Name: {classItem.instructorName}</p>
                                        <p className="font-bold">Available Seats: {classItem.seats}</p>
                                        <p className="font-bold mt-5"><span className="text-xl">Price: </span> {classItem.price} $</p>
                                    </div>
                                    <div className="card-actions justify-center mt-5">
                                        <button onClick={() => handleSelection(classItem)} disabled={isAdmin || isInstructor || classItem.seats === 0 || isSelected(classItem._id)} className="btn bg-orange-600 font-bold hover:bg-green-500 border-none text-white absolute bottom-4">{isSelected(classItem._id) ? "Selected" : "Select"}</button>
                                        <Toaster></Toaster>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Roll>
                </div>
            </div></>
    );
};

export default Classes;