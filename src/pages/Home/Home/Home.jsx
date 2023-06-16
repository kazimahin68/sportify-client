import Banner from "../Banner/Banner";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import {Helmet} from "react-helmet";

const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>Sportify Camp || Home</title>
            </Helmet>
           <Banner></Banner>
           <PopularClass></PopularClass>
           <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;