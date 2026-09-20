import axios from "axios";
import { BookLendingAppUrl } from "../config";

// Creating an axios instance that enables sending and receiving cookies along with the HTTP requests. 
const axiosInstance = axios.create({
    withCredentials: true,
 })


 export const addStudent= async(Student, setMessage)=>{
    try{
        // Adding a student object to the backend
        const response=await axiosInstance.post(BookLendingAppUrl + "/api/booklending/students",Student, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }})
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        setMessage("Student Added Successfully")
    }
    catch(error){
        console.log(error);
        setMessage("Could not add student as a student with that code already exists/null fields in request.")
    }
}

export const deleteStudent=async(rollNo)=>{
    try{
        // Deleting a student corresponding to a roll number
        const response=await axiosInstance.delete(BookLendingAppUrl+`/api/booklending/students/RollNo/${rollNo}`, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }})
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
    }
    catch(error){
        console.log(error);

    }
}

export const updateStudent=async(Student)=>{
    try{
        // Updating a student corresponding to a roll number
        const response = await axiosInstance.put(BookLendingAppUrl+"/api/booklending/students",Student, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
    }
    catch(error){
        console.log(error);
    }
}

export const fetchStudents=async(setStudents)=>{
    try{
        // Getting all students from the backend
        const response = await axiosInstance.get(BookLendingAppUrl+'/api/booklending/students', {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }})
        .then(response=>{
            setStudents(response.data);
        });
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
    }
    catch(error){
        console.log("Error getting student: "+ error)
    }
}

export const fetchStudentDetails=async(setStudent,rollNo)=>{
    try{
        // Getting student details for a book of a particular 'roll number' from the backend
        const response=axiosInstance.get(BookLendingAppUrl + `/api/booklending/students/rollNo/${rollNo}`,{headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }}).then(res=>{
            setStudent(res.data);
        })
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
    }
    catch(error){
        console.log('Error fetching student details', error);
    }
}

export const Login=async(Login)=>{
    try{
        // Sending a post request to backend to authorize the user
        const response=await axiosInstance.post(BookLendingAppUrl+"/api/users/login",Login, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Storing the jwt returned in local storage
        localStorage.setItem("jwt", response.data)
        return response.status==200?true:false
    }
    catch(error){
        console.log(error)
    }
}

export const Logout=async()=>{
    try{
        // Sending a request to backend to logout
        const response=await axiosInstance.post(BookLendingAppUrl+"/api/user/logout",null);
    }
    catch(error){
        console.log(error);
    }
}
