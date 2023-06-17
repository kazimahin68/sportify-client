import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";

const Admin = () => {
    const { data: admins = [] } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const res = await fetch('https://sportify-camp-server-kazimahin68.vercel.app/users/admin')
            return res.json();
        }
    })

    console.log(admins)
    return (
        <section>
            <div className="md:w-4/5 mx-auto mb-12 mt-24">
                <h2 className="uppercase text-4xl font-bold text-center mb-2 text-orange-600">Our Three Main Contributors</h2>
                <hr className="mb-10 border-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    <Fade cascade>
                        {admins.map((admin) => (
                            <div key={admin._id}
                                className="card shadow-x border-orange-600 border-2 p-5 h-80">
                                <img className="rounded-full h-24 w-24 mx-auto" src={admin.userPhoto} alt="" />
                                <div className="card-body">
                                    <h2 className="card-title font-extrabold capitalize">{admin.userName}</h2>
                                    <div>
                                        <p className="font-bold">Instructor Email: {admin.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Fade>
                </div>
            </div>
        </section>
    );
};

export default Admin;