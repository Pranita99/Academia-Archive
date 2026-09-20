import { useState, useEffect } from "react"
import { Button } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { fetchBooks } from "../../API/baseApi";
import {ConfirmDeleteModal} from "./ConfirmDeleteModal";
import UpdateBookModal from "./UpdateBookModal";

export const BooksTable = ({searchBooks}) => {
    const [bookCodetoDelete, setBookCodeToDelete] = useState(); // The code of a book which is to be deleted (before pressing ok to delete in the modal)
    const [books, setBooks] = useState([]); // Books which are returned by the backend
    const [deleteModal, setDeleteModal] = useState(); // State variable to display the 'confirm delete' modal
    const [updateModal, setUpdateModal] = useState(); // State variable to display the update book modal
    const [booktoUpdate, setBookToUpdate]=useState(); // State variable for Updated Book Object
    
    useEffect(() => {
        async function getBooks(){
            await fetchBooks(setBooks);
        }
        getBooks(); // Fetching all books once the page is loaded
    }, []);

    return (
        <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-4 px-6">
            <div className="text-2xl font-bold text-white border-gray-400 border-b-2 pb-4 ">Books List</div>
            {/* Title Header for all the books */}
            <div className="w-full">
                <div className="grid grid-cols-12 xl:mx-0 mx-4">
                    <div className="text-[12px] text-gray-400 text-left py-6  xl:col-span-1 xl:block hidden ">

                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6  col-span-2">
                        Title
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 lg:col-span-3 xl:col-span-2 col-span-2">
                        Author
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 col-span-2 ">
                        Code
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 col-span-3">
                        Description
                    </div>

                </div>

                {/* Displaying the books returned by the backend */}
                
                {books.map((book,key) => (
                    (searchBooks === "" || book.title.includes(searchBooks)) &&  // Filtering according to book title
                    <div key={key} className="grid grid-cols-12 bg-[#FFFFF0] rounded-xl  mb-3 xl:px-0 px-4 py-2">
                        <div className="text-center pl-2 items-center h-full hidden xl:flex text-[10px] md:text-sm text-black  xl:col-span-1">
                            <img src="/images/BookElement.png" className="h-4/5 scale-90"></img>
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words pr-3">
                            {book.title}
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto xl:col-span-2 lg:col-span-3 col-span-2 break-words pr-3">
                            {book.author}
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words pr-3">
                            {book.code}                        
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words md:col-span-3 pr-3">
                            {book.description}

                        </div>
                        <div className="  col-span-4 md:col-span-3 lg:col-span-2 flex-col my-auto pr-2">
                            <div className="flex md:justify-center md:items-center justify-end items-end">
                                {/* Navigating to the book details page of the current book */}
                                <Link to={`/bookdetails/${book.code}`}><Button className="bg-blue-550 normal-case text-[10px] xl:text-sm font-normal rounded-2xl py-2 "> See Students</Button></Link>
                            </div>

                            <div className="flex md:justify-center md:items-center justify-end items-end mr-8 md:mr-0 mt-1">
                                <img src="/images/Pen.png" className="hover:cursor-pointer contain my-auto xl:mr-6 mr-4 md:scale-100 scale-75" onClick={()=>{
                                    // Displaying the update book modal
                                    setUpdateModal('default');
                                    // The update modal should have the details of the current book by default in the fields
                                    setBookToUpdate(book);
                                }}></img>

                                <UpdateBookModal openModal={updateModal} setOpenModal={setUpdateModal} details={booktoUpdate} />

                                <img onClick={() => {
                                    // Displaying the 'confirm delete' modal
                                    setDeleteModal('default');
                                    // Setting the book code of the book to delete
                                    setBookCodeToDelete(book.code);
                                }} src="/images/trash.png" className="hover:cursor-pointer contain my-auto md:scale-100 scale-75"></img>
                                <div className="col-span-4 lg:col-span-3 xl:col-span-4 flex justify-end items-center">
                                    <ConfirmDeleteModal openModal={deleteModal} setOpenModal={setDeleteModal} code={bookCodetoDelete} />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                ))}


            </div>

        </div>
    )
}