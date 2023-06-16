import { useQuery } from "@tanstack/react-query";

const PopularInstructor = () => {
    const { data: instructors = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/popular')
            return res.json();
        }
    })
    console.log(instructors)
    return (
        <div>

        </div>
    );
};

export default PopularInstructor;