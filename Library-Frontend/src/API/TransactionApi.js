import axios from "axios";
import { BookLendingAppUrl } from "../config";

const axiosInstance = axios.create({
    withCredentials: true,
 })

export const getLendedBooks=async(rollNo,setBooks)=>{
    try{
        // Getting all books that are lent to a student of a given roll number
        const response = await axiosInstance.get(BookLendingAppUrl+`/api/booklending/getBook/${rollNo}`, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }})
        .then(res=>{
            setBooks(res.data);
        })
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        // The backend will allow us only if the jwt denotes a librarian is logged in
    }
    catch(error){
        console.log(error);
    }
}

export const getIssuedStudents=async(code,setStudents)=>{
    try{
        // Getting the student that has issued a book of a given code.
        const response = await axiosInstance.get(BookLendingAppUrl+`/api/booklending/getStudent/${code}`, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }})
        .then(res=>{
            setStudents(res.data);
        })
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        // The backend will allow us only if the jwt denotes a librarian is logged in
    }
    catch(error){
        console.log(error);
    }
}

export const lendBook=async(values)=>{
    try {
        // Lending a book of a given code to a student of a given roll number (refer to the bookLendingEntity in the backend code)
        const response= await axiosInstance.post(BookLendingAppUrl+ `/api/booklending/lendBook`, values, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        // The backend will allow us only if the jwt denotes a librarian is logged in
    }
    catch(error){
        console.log(error);
    }
}

export const returnBook=async(transactionId)=>{
    try{
        // Returning a book that corresponded to a transactionId
        const response= await axiosInstance.put(BookLendingAppUrl+`/api/booklending/returnBook/${transactionId}`, null,{headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        // The backend will allow us only if the jwt denotes a librarian is logged in
    }
    catch(error){
        console.log(error)
    }
}

export const getLibrarian=async(setLibrarian)=>{

    try{
        // Getting all librarians that have been added so far
        const response = await axiosInstance.get(BookLendingAppUrl+`/api/admin/getLibrarian`, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }})
        .then(res=>{
            setLibrarian(res.data);
        })
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        // The backend will allow us only if the jwt denotes an admin is logged in.
    }
    catch(error){
        console.log(error)
    }
}

export const addLibrarian=async(Librarian)=>{
    try{
        // Adding a new librarian
        const response=await axiosInstance.post(BookLendingAppUrl+ `/api/admin/addLibrarian`, Librarian, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }})
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        // The backend will allow us only if the jwt denotes an admin is logged in.
    }
    catch(error){
        console.log(error);
    }
}

export const deleteLibrarian=async(email)=>{
    try{
        // Deleting a librarian
        const response = await axiosInstance.delete(BookLendingAppUrl+ `/api/admin/deleteLibrarian/${email}`, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        // The backend will allow us only if the jwt denotes an admin is logged in.
    }
    catch(error){
        console.log(error);
    }
}