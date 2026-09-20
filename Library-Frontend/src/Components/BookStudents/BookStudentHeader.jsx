import { Link } from "react-router-dom"
import { Logout } from "../../API/StudentApi";
import { useNavigate } from "react-router-dom";
export const BookStudentHeader = () => {
    
    const navigate = useNavigate();
    
    // Component to display header

    return (
        <div>
            <div className="flex pt-8 px-6 lg:px-12 text-white">
                <div className="hover:cursor-pointer flex-auto font-bold text-xl">
                    <Link to={`/dashboard`}> Book Lending Application</Link>
                </div>

                <div className="flex text-xl hover:cursor-pointer" onClick={async()=>{
                    await Logout();
                    navigate("/login");
                    localStorage.removeItem("jwt");
                }}>
                    Logout
                </div>
            </div>
        </div>
    )
}