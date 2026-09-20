import { StudentBooksHeader } from "./StudentBooks/StudentBooksHeader";
import { StudentBooksTable } from "./StudentBooks/StudentBooksTable";
import { Button } from "@material-tailwind/react";
import { StudentDetails } from "./StudentBooks/StudentDetails";
import {useParams} from "react-router-dom";
import { useEffect,useState } from "react";
import { fetchStudentDetails } from "../API/StudentApi";
export default function StudentDetailsPage(){

    // Page for viewing details of a particular student

    const {id} = useParams();
    const [student, setStudent] = useState();
    const [searchBook, setSearchBook] = useState(""); // State variable to find a book by title from the list of lent books to the student


    useEffect(()=>{
        async function getStudentDetails(){
            await fetchStudentDetails(setStudent,id);
        }
        getStudentDetails(); // Fetching student details of the given book from the backend
    },[])

    return (
        <div className="bg-blue-550 min-h-screen pb-6">
        
            <StudentBooksHeader setSearchBook={setSearchBook} />

            <div className="mt-4 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                
               {/* Displaying the student details for screens of smaller size on the top */}
                <div className="lg:hidden">
                    <StudentDetails setSearchBook={setSearchBook} name={student?.name} email={student?.email} id={student?.rollNo} phone={student?.phone}/>
                </div>

                {/* Component that displays the student that has borrowed the book */}
                <StudentBooksTable searchBook={searchBook} id={id}/>

                 {/* Displaying the student details for screens of larger size on the side */}
                <div className="lg:block hidden">
                    <StudentDetails setSearchBook={setSearchBook} name={student?.name} email={student?.email} id={student?.rollNo} phone={student?.phone}/>
                </div>

            </div>
            
        </div>
    )
}