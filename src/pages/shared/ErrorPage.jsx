import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className='md:w-4/5 mx-auto min-h-screen'>
            <div className="pt-12 flex flex-col gap-5">
                <img className='mb-5 h-96 w-96 rounded-3xl mx-auto' src="https://i.ibb.co/RYS1PCp/error.png" alt="" />
                <p className='text-6xl text-center text-red-600 font-bold mb-5'>Page not found</p>
                <Link to='/' className="btn bg-orange-600 hover:bg-green-600 border-none w-1/3 mx-auto">Back to Home Page</Link>
            </div>
        </div>
    );
};

export default ErrorPage;