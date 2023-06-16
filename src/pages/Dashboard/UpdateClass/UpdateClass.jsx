import { useParams } from "react-router-dom";

const UpdateClass = () => {
    const { id } = useParams();
    console.log(id)

    // TODO: Complete this page
    return (
        <div>
            <h2>This is update page</h2>
        </div>
    );
};

export default UpdateClass;