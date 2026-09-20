import { useState, useEffect } from "react"
import { Button } from "@material-tailwind/react"
import { AddBookModal } from "./AddBookModal"
import { getLendedBooks } from "../../API/TransactionApi"
import { ConfirmBookDelete } from "./ConfirmBookDelete"
import { useNavigate } from "react-router-dom"
export const StudentBooksTable = ({id,searchBook}) => {

    const [books, setBooks] = useState([]); // Books that have been borrowed by the student
    const [deleteModal, setModal]=useState(); // State variable to display/hide 'confirm delete' modal
    const [trid, setIdToDelete]=useState(); // Setting the transaction Id when we are returning the book from its student
    
    const navigate=useNavigate();
    
    useEffect(()=>{
        async function fetchBooks(){
            await getLendedBooks(id,setBooks);
        }
        fetchBooks(); // Getting the books that have been lent to the current student
    }, [])
    
    return (
        <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-4 px-6">
            <div className="flex  text-2xl font-bold text-white border-gray-400 border-b-2 pb-4 ">
                <div className="flex-auto">Books List</div>
                <div>      
                    <Button className="bg-[#F9D745] text-blue-550 rounded-3xl normal-case font-normal  text-[10px] md:text-sm xl:text-[16px] md:py-2 py-0" onClick={()=>{navigate("/students")}}>Return</Button>
                </div>
            </div>

            {/* Header for book details */}
            <div className="w-full">
                <div className="grid grid-cols-12 lg:mx-0 mx-4">
                    <div className="text-[12px] text-gray-400 text-left py-6 lg:col-span-2 xl:col-span-1 lg:block hidden ">

                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6  col-span-2 ">
                        Title
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6  col-span-2">
                        Author
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 col-span-2 ">
                        Code
                    </div>
                    <div className="text-[12px] text-gray-400 text-left py-6 col-span-2">
                        Description
                    </div>

                    <div className=" lg:col-span-2 xl:col-span-3 col-span-4  flex justify-end items-center">
                        {/* <Button className="bg-[#F9D745] text-blue-550 rounded-3xl normal-case font-normal  text-[10px] md:text-[12px] xl:text-[16px] py-2">Add Book</Button> */}
                        <AddBookModal rollNo={id}/>
                    </div>
                </div>

                {/* Tile for the books that have been borrowed by the current student */}     
                {books.map((lib,key) => (
                    (searchBook==="" || lib.title.includes(searchBook)) && 
                    <div key={key} className="grid grid-cols-12 bg-[#FFFFF0] rounded-xl h-16 lg:h-20 mb-3 lg:px-0 px-4">
                        <div className="text-center pl-2 items-center h-full hidden lg:flex text-[10px] md:text-sm text-black  lg:col-span-2 xl:col-span-1">
                            <img src="/images/BookElement.png" className="h-4/5 xl:scale-90 scale-75"></img>
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words pr-3">
                            {lib.title}
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2  break-words pr-3">
                            {lib.author}
                        </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto col-span-2 break-words pr-3">
                            {lib.code}                       </div>
                        <div className="text-[10px] md:text-sm text-black text-left my-auto xl:col-span-4 lg:col-span-3 col-span-4 break-words pr-3">
                            {lib.description}

                        </div>
                        <div className="col-span-2 lg:col-span-1  flex justify-end xl:pr-8 pr-4">
                            {/* Button to return the book for the student */}
                            <img src="/images/trash.png" className="hover:cursor-pointer contain my-auto md:scale-100 scale-75" onClick={()=>{
                                 setModal('default');
                                 setIdToDelete(lib.bookLendingEntity.transactionId);
                            }}></img>
                            {/* Modal that asks user if they want to confirm the process of returning the current book */}
                            <ConfirmBookDelete id={trid} openModal={deleteModal} setOpenModal={setModal}/>
                        </div>
                    </div>
                ))}


            </div>

        </div>
    )
}