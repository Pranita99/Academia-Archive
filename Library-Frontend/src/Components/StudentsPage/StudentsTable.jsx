import { useState,useEffect } from "react"
import { Button } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { fetchStudents } from "../../API/StudentApi"
import { ConfirmStudentDeleteModal } from "./ConfirmStudentDeleteModal"
import { UpdateStudentModal } from "./UpdateStudentmodal"

export const StudentTable=({searchStudent})=>{
    const [students, setStudents]=useState([]); // Students which are returned by the backend
    const [deleteModal, setDeleteModal] = useState(); // State variable to display the 'confirm delete' modal
    const [rollNotoDelete, setRollNoToDelete] = useState(); // The rollNo of a student which is to be deleted (before pressing ok to delete in the modal)
    const [updateModal, setUpdateModal] = useState(); // State variable to display the update book modal
    const [studenttoUpdate, setStudentToUpdate]=useState(); // State variable for Updated Student Object

    useEffect(()=>{
        async function getStudents(){
            await fetchStudents(setStudents);
        }
        getStudents(); // Fetching all students once the page is loaded
    },[])

    return (
        <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-4 px-6">
            <div className="text-2xl font-bold text-white border-gray-400 border-b-2 pb-4 ">Students List</div>
            {/* Title Header for all the students */}
            <div className="w-full">
                <div className="grid grid-cols-12 xl:mx-0 mx-4">
                    <div className="text-[12px] text-gray-400 text-left py-6  xl:col-span-1 xl:block hidden ">

                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6  col-span-2">
                        Name
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 lg:col-span-3 xl:col-span-2 col-span-2">
                        Email
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 col-span-2 ">
                        Phone
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 col-span-3">
                        Roll No
                    </div>
                    
                </div>

                {/* Displaying the students returned by the backend */}
                {students.map((lib,key)=>(
                    (searchStudent === "" || (lib.name).includes(searchStudent)) &&
                    <div key={key} className="grid grid-cols-12 bg-[#FFFFF0] rounded-xl mb-3 xl:px-0 px-4 py-2">
                        <div className="hidden xl:flex items-center pl-2 text-[10px] md:text-sm text-black text-left xl:col-span-1 mr-2">
                            <img src="/images/Student.png" className=""></img>
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words pr-3 ">
                            {lib.name}
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto xl:col-span-2 lg:col-span-3 col-span-2 break-words pr-3">
                            {lib.email}
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words pr-3">
                            {lib.phone}                 
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words md:col-span-3  pr-3">
                            {lib.rollNo}
                        </div>
                        <div className="  col-span-4 md:col-span-3 lg:col-span-2 flex-col my-auto pr-2">
                            <div className="flex md:justify-center ,md:items-center justify-end items-end">
                               {/* Navigating to the student details page of the current student */}
                               <Link to={`/studentdetails/${lib.rollNo}`}><Button className="bg-blue-550 normal-case text-[10px] xl:text-sm font-normal rounded-2xl py-2 ">See Books</Button></Link> 
                            </div>
                            <div className="flex md:justify-center md:items-center justify-end items-end mr-6 md:mr-0 mt-1">
                                <img src="/images/Pen.png" className="hover:cursor-pointer contain my-auto xl:mr-6 mr-4 md:scale-100 scale-75 " onClick={()=>{
                                    // Displaying the update student modal
                                    setUpdateModal('default');
                                    // The update modal should have the details of the current student by default in the fields
                                    setStudentToUpdate(lib);
                                }}></img>

                                <UpdateStudentModal openModal={updateModal} setOpenModal={setUpdateModal} details={studenttoUpdate} />

                                <img src="/images/trash.png" className=" hover:cursor-pointer contain my-auto md:scale-100 scale-75" onClick={()=>{
                                    // Displaying the 'confirm delete' modal
                                    setDeleteModal('default');
                                    // Setting the roll no of the student to delete
                                    setRollNoToDelete(lib.rollNo);
                                }}></img>
                                <div className="col-span-4 lg:col-span-3 xl:col-span-4 flex justify-end items-center">
                                    <ConfirmStudentDeleteModal openModal={deleteModal} setOpenModal={setDeleteModal} rollNo={rollNotoDelete} />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                ))}
                
                
            </div>
            
        </div>
    )
}