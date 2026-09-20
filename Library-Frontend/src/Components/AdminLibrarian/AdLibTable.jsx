import { useState, useEffect } from "react"
import { getLibrarian } from "../../API/TransactionApi"
import { ConfirmLibrarianDelete } from "./ConfirmLibrarianDelete";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
export const AdLibTable = () => {
    
    // Component to display list of librarians

    const [librarians, setLibs] = useState([]); //State variable to set list of librarians
    const [email, setEmail]=useState(); // State variable to set email of librarian to delete
    const [modal, setModal]=useState(); // State variable to show/hide confirm delete modal
    
    const navigate=useNavigate();
    
    useEffect(()=>{
        async function getlibrarians(){
            await getLibrarian(setLibs)
        }
        getlibrarians(); // Getting the list of librarians from the backend

    },[])
    
    return (
        <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-4 px-6">

            {/* Button to go back to dashboard */}
            <div className="flex  text-2xl font-bold text-white border-gray-400 border-b-2 pb-4 ">
                <div className="flex-auto">Librarians</div>
                <div>      
                    <Button className="bg-[#F9D745] text-blue-550 rounded-3xl normal-case font-normal  text-[10px] md:text-sm xl:text-[16px] md:py-2 py-0" onClick={()=>{navigate("/dashboard")}}>Return</Button>
                </div>
            </div>

            {/* Header for list of librarians */}

            <div className="w-full">
                <div className="grid grid-cols-12 lg:mx-0 mx-4">
                    <div className="text-[12px] text-gray-400 text-left py-6 lg:col-span-2 xl:col-span-1 lg:block hidden ">

                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6  col-span-2">
                        Name
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 lg:col-span-2 col-span-3">
                        Email
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 col-span-2 ">
                        Password
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 col-span-3 md:pl-0 pl-3">
                        ID
                    </div>

                </div>

                {/* Dislpaying the list of librarians with their details */}

                {librarians.map((lib) => (
                    <div className="grid grid-cols-12 bg-[#FFFFF0] rounded-xl py-2 mb-3 lg:px-0 px-4">
                        <div className="hidden lg:block text-[10px] md:text-sm text-black text-left xl:col-span-1 lg:col-span-2">
                            <img src="/images/Profile.png" className=" h-20 object-contain"></img>
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words pr-3">
                            {lib.name}
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto lg:col-span-2 col-span-3 break-words pr-3">
                            {lib.email}
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words pr-3">
                            {lib.password}
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto xl:col-span-4 col-span-3 break-words pr-3  md:pl-0 pl-3">
                            {lib.id}
                        </div>
                        <div className="col-span-2 md:col-span-1 flex justify-end pr-8">
                            <img src="/images/trash.png" className="hover:cursor-pointer contain my-auto md:scale-100 scale-75" onClick={()=>{
                                setModal('default'); // Showing confirm delete modal
                                setEmail(lib.email); // Setting email of librarian to delete
                            }}></img>
                            <ConfirmLibrarianDelete email={email} openModal={modal} setOpenModal={setModal}/>
                        </div>
                    </div>
                ))}


            </div>

        </div>
    )
}