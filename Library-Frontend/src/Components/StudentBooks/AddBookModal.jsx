'use client';

import { Modal } from 'flowbite-react';
import { Button } from '@material-tailwind/react';
import { useState,useRef } from 'react';
import { lendBook } from '../../API/TransactionApi';

export const AddBookModal=({rollNo})=> {
  
  const [openModal, setOpenModal] = useState(); // State variable to show/hide the lend to student roll number modal
  const inputRef = useRef("") // Inputted roll number
  const [errorcode,setError] = useState(""); // State variable for the error in the roll number entered

  const handleCode=(e)=>{
    inputRef.current=e.target.value;
    if(inputRef.current.includes("/")) setError("Rollno can't have '/'")
    else setError("");
  }
  const handleSubmit=async(e) => 
  {
      e.preventDefault();
      if(inputRef.current==""){
        setError("Required Field");
      }
      else if(errorcode==""){
        let bookCode=inputRef.current;
        console.log(bookCode);
        await lendBook({"bookCode": bookCode ,"rollNo":rollNo}); // Issuing the entered book code to the student
        setOpenModal(undefined); // Closing the modal
        window.location.reload();
      }
      
  }
  
  return (
    <>
      {/* Button to display the modal to enter a book code to lend the book to a student */}
      <Button className="bg-[#F9D745] text-blue-550 rounded-3xl normal-case font-normal  text-[10px] md:text-sm xl:text-[16px] py-2" onClick={() => setOpenModal('default')}>Add Book</Button>

       {/* Modal once displayed */}
      <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} size="sm"  >
          <div className="flex items-start justify-between rounded-t dark:border-gray-600 p-5 bg-[#F9D745]">
                  <div className="pl-6">
                      <img src="/images/modal1.png" className='object-cover'></img>
                  </div>

                  <div>
                      <button aria-label="Close" className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" type="button" onClick={() => setOpenModal(undefined)}>
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>

              </div>
          </div>
          
          <div className='bg-[#F9D745] flex items-center justify-center py-4'>
              <img src="/images/model2.png" ></img>
          </div>

          <div className='bg-[#F9D745]'>
              <div className="mt-6 text-black">
                      
                  <div className=" w-4/5 mx-auto">
                      <div className="text-sm text-gray-600 ">Book Code</div>
                      <input type="text" className="border-0 border-b-2  border-black text-[16px] mt-1  focus:ring-0 focus:border-black px-0  placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter book code" ref={inputRef} onChange={handleCode} />
                      <div className="mt-1 text-red-600 text-sm">{errorcode}</div>

                  </div>
                  
                  <div className="flex justify-center mx-auto w-4/5 my-8">
                      <Button className="bg-blue-550 w-full rounded-xl py-4 text-white" onClick={handleSubmit}>Add</Button>
                  </div>

              </div>
          </div>
        
        
      </Modal>
    </>
  )
}


