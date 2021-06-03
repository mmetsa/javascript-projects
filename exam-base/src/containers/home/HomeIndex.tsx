import { Link } from "react-router-dom";

const HomeIndex = () => {
    return (
        <>
            <div className="row justify-content-center mt-3">
                <h1>Welcome to our Study system</h1>
            </div>
            <div className="row justify-content-center mt-3">
                <h3>
                    <Link to="/subjects">Find out about our courses</Link>
                </h3>
            </div>
        </>
    );
};

export default HomeIndex;
