import { StudentHeader } from "./StudentsPage/StudentsHeader";
import { StudentTable } from "./StudentsPage/StudentsTable";
import { AddStudent } from "./StudentsPage/AddStudent";
import { useState } from "react";

export default function StudentPage(){
    const [searchStudent, setSearchStudent] = useState(""); // State variable that holds the student name that has been searched for

    return (
        <div className="bg-blue-550 min-h-screen pb-6">
            {/* Header */}
            <StudentHeader setSearchStudent={setSearchStudent}/>

            <div className="mt-4 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                {/* Displaying the list of students */}
                <StudentTable searchStudent={searchStudent}/>
                <div className="hidden lg:block">
                    {/* Component to add student */}
                    <AddStudent />
                </div>
            </div>
        </div>
    )
}