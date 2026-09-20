import React from 'react'
import { Modal } from 'flowbite-react';
import { Button } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { updateBook } from '../../API/baseApi';

export default function UpdateBookModal({details,openModal,setOpenModal}) {

    // State variables for the updated fields entered
    const [title,setTitle]=useState("");
    const [desc, setDesc]=useState("");
    const [author, setAuthor]=useState("");
  
    // State varaibles for the error in the updated fields entered
    const [errorauthor, setErrorauthor]=useState("");
    const [errordesc, setErrordesc]=useState("");
    const [errortitle, setErrortitle]=useState("");

    const handleAuthorChange=(e)=>{
            let text=e.target.value;
            if(text === "") setErrorauthor("Author Name cannot be empty")
            else setErrorauthor("")
            setAuthor(text)
        }

        const handleDescChange=(e)=>{
            let text=e.target.value;
            if(text === "") setErrordesc("Description cannot be empty")
            else setErrordesc("")
            setDesc(text);
        }

        const handleTitleChange=(e)=>{
            let text=e.target.value;
            if(text === "") setErrortitle("Title cannot be empty")
            else setErrortitle("")
            setTitle(e.target.value)
        }

        useEffect(()=>{
            setTitle(details?.title);
            setDesc(details?.description);
            setAuthor(details?.author);
        },[openModal])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(desc=="" || author=="" || title=="" ){
            if(author=="") setErrorauthor("Required Field");
            if(desc=="") setErrordesc("Required Field");
            if(title=="") setErrortitle("Required Field");
        }

        else if(errorauthor=="" && errordesc=="" && errortitle=="" )
        {
            const Book = {
                code: details?.code,
                author : author,
                title : title,
                description : desc
            };
            // Updating the book of the same code with the new fields
            await updateBook(Book);
            setOpenModal(undefined);
            window.location.reload();
        }
    }

  return (
    <>
      <Modal show={openModal === 'default'} onClose={() => {
        setOpenModal(undefined);
        setErrorauthor("");
        setErrordesc("");
        setErrortitle("");
      }} size="md"  >

        {/* Close Button */}
        <div className="flex items-start justify-between rounded-t dark:border-gray-600 p-5 bg-[#F9D745]">
            <div>
                <button aria-label="Close" className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" type="button" onClick={() => setOpenModal(undefined)}>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>

        <div className='bg-[#F9D745]'>
            <div className=" text-black">
                <div className="w-full ">
                    <img src="/images/Pic1.png" className="object-contain flex mx-auto"></img>
                </div>

                <div className="mt-6 text-black">
                    
                    <form>
                        {/* New Fields */}

                        {/* Book code cannot be updated */}
                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600 ">Book Code</div>
                            <input type="text" className="border-0 border-b-2  border-black text-[16px] mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter roll number" disabled defaultValue={details?.code}/>
                        </div>

                        <div className=" w-4/5 mx-auto">
                            <div className="text-sm text-gray-600 ">Title</div>
                            <input type="text" className="border-0 border-b-2  border-black text-[16px] mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter book title" defaultValue={title} onBlur={handleTitleChange}  />
                            <div className="mt-1 text-red-600 text-sm">{errortitle}</div>
                        </div>

                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600 ">Author</div>
                            <input type="author" className="border-0 border-b-2  border-black text-[16px] mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter book author" defaultValue={author} onBlur={handleAuthorChange}/>
                            <div className="mt-1 text-red-600 text-sm">{errorauthor}</div>
                        </div>

                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600 ">Description</div>
                            <input type="text" className="border-0 border-b-2  border-black text-[16px] mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter book description" defaultValue={desc} onBlur={handleDescChange}/>
                            <div className="mt-1 text-red-600 text-sm">{errordesc}</div>
                        </div>

                        <div className="flex justify-center mx-auto w-4/5 mt-6 mb-6">
                            <Button className="bg-blue-550 w-full rounded-xl py-4 text-white" onClick={handleSubmit}>Update</Button>
                        </div>
                        
                    </form>
                </div>

            </div>
        </div>
        
      </Modal>
    </>
  )
}
