import { useParams } from "react-router-dom";
import { BookDetails } from "./BookStudents/BookDetails";
import { BookStudentHeader } from "./BookStudents/BookStudentHeader";
import { BookStudentTable } from "./BookStudents/BookStudentTable";
import { fetchBookDetails } from "../API/baseApi";
import { useEffect,useState } from "react";

export default function BookDetailsPage(){
    
    // Page for viewing details of a particular book

    const {id} = useParams();
    const [book, setBook] = useState({});
    
    useEffect(() => {
        async function getBookDetails(){
            await fetchBookDetails(setBook,id);
        }
        getBookDetails(); // Fetching book details of the given book from the backend
    }, []);

    return (
        <div className="bg-blue-550 min-h-screen pb-6">
        
            <BookStudentHeader/>

            <div className="mt-4 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                
                {/* Displaying the book details for screens of smaller size on the top */}
                <div className="lg:hidden">
                    <BookDetails title={book.title} author={book.author} code={book.code} description={book.description}/>
                </div>

                {/* Component that displays the student that has borrowed the book */}
                <BookStudentTable id={id}/>

                {/* Displaying the book details for screens of larger size on the side */}
                <div className="lg:block hidden">
                    <BookDetails title={book.title} author={book.author} code={book.code} description={book.description}/>
                </div>

            </div>
            
        </div>
    )
}