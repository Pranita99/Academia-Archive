import axios from "axios";
import { BookLendingAppUrl } from "../config";

// Creating an axios instance that enables sending and receiving cookies along with the HTTP requests. 
const axiosInstance = axios.create({
    withCredentials: true,
})

export const fetchBooks = async (setBooks) => {
    try {
        // Getting all books from the backend
        const response = await axiosInstance.get(BookLendingAppUrl+ '/api/booklending/books',{headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        setBooks(response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};

export const fetchBookDetails = async (setBook,code) => {
    try {
        // Getting book details for a book of a particular 'code' from the backend
        const response = await axiosInstance.get(BookLendingAppUrl+ `/api/booklending/books/code/${code}`,{headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        setBook(response.data);
    } catch (error) {
        console.error('Error fetching book details', error);
    }
};

export const addBook = async (Book, setMessage) => {
    try{
        // Adding a book object to the backend
        const response=await axiosInstance.post(BookLendingAppUrl + "/api/booklending/books",Book, {headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
        setMessage("Book Added Successfully")
    }
    catch(error){
        console.log(error);
        // Backend returns an error while trying to add a book
        setMessage("Could not add book as a book with that code already exists/null fields in request.");
    }
}

export const deleteBook = async (code) => {
    try{
        // Deleting a book corresponding to a book code
        const response = await axiosInstance.delete(BookLendingAppUrl+ `/api/booklending/books/code/${code}`,{headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
    }catch (error){
        console.log(error)
    }
}

export const updateBook = async(Book) => {
    try{
        // Updating a book corresponding to a book code
        const response = await axiosInstance.put(BookLendingAppUrl + "/api/booklending/books", Book,{headers: {
            'Authorization': "Bearer "+ localStorage.getItem("jwt")
        }});
        // Adding the JWT from the frontend to denote that the user is authorized while sending request to backend.
    }
    catch(error){
        console.log(error);
    }
}

