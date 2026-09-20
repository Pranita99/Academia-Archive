import React from 'react'
import {useNavigate,Link} from "react-router-dom"
import { Logout } from '../API/StudentApi';

export default function PagesOptions() {
    
    // Page that allows librarians to view all students or all books
    
    const navigate = useNavigate();
    
    return (
        <div className='min-h-[100vh] bg-blue-550 pb-8'>
            
            {/* Header */}
            <div className="flex mb-6">
                <div className="hover:cursor-pointer flex-auto text-white font-bold text-xl p-8">
                    <Link to={`/dashboard`}>Book Lending Application</Link>
                </div>
                <div className="text-white text-xl p-8">
                    <Link to={`/adminlibrarian`}> Librarians</Link>
                </div>
                <div className="text-white text-xl p-8 hover:cursor-pointer" onClick={async()=>{
                    await Logout();
                    navigate("/login");
                    localStorage.removeItem("jwt");
                }}>
                    Logout 
                </div>
            </div>

            {/* Laptop Size */}
            <div className='hidden lg:flex justify-center'>

                <div className='flex flex-col justify-around mr-[8%] bg-[#F9D745] rounded-md px-12 py-12 w-[30%]'>
                    <img src="/images/Pic2.png" className="object-contain mx-auto my-4" alt="Student Page" />
                    <div className='text-3xl mt-7'>
                        Student Page
                    </div>
                    <div className='text-xl mt-4'>
                        Manage books for a selected Student from a list of all students.
                    </div>
                    <div className='mt-6'>
                        <button className='bg-[#000842] hover:bg-[#4d5599] text-white w-[100%] h-[40px] rounded-lg' onClick={()=>{
                            navigate("/students");
                        }}>Go There!</button>
                    </div>
                </div>

                <div className='flex flex-col justify-around bg-[#F9D745] rounded-md px-12 py-12 w-[30%]'>
                    <img src="/images/BookPage.png" className="object-contain mx-auto my-4" alt="Book Page" />
                    <div className='text-3xl'>
                        Book Page
                    </div>
                    <div className='text-xl mt-4'>
                        Manage Students for a selected Book from a list of all Books.
                    </div>
                    <div className='mt-6'>
                        <button className='bg-[#000842] hover:bg-[#4d5599] text-white w-[100%] h-[40px] rounded-lg' onClick={()=>{
                            navigate("/books")
                        }}>Go There!</button>
                    </div>
                </div>

            </div>

            {/* Phone Size */}
            <div className='lg:hidden flex flex-col items-center justify-center'>

                <div className='mt-8 mb-12'>
                    <img src="/images/Sitting.png"></img>
                </div>

                <div className='flex flex-col justify-around bg-[#F9D745] rounded-md px-4 py-4 w-[90%]'>
                    <img src="/images/Pic2.png" className="object-contain mx-auto my-4" alt="Student Page" />
                    <div className='text-3xl mt-7'>
                        Student Page
                    </div>
                    <div className='text-lg mt-4'>
                        Manage books for a selected Student from a list of all students.
                    </div>
                    <div className='mt-6'>
                        <button className='bg-[#000842] hover:bg-[#4d5599] text-white w-[100%] h-[40px] rounded-lg' onClick={()=>{
                            navigate("/students")
                        }}>Go There!</button>
                    </div>
                </div>
                
                <div className='mt-8 mb-8 flex flex-col justify-around bg-[#F9D745] rounded-md px-4 py-4 w-[90%]'>
                    <img src="/images/BookPage.png" className="object-contain mx-auto my-4" alt="Book Page" />
                    <div className='text-3xl'>
                        Book Page
                    </div>
                    <div className='text-lg mt-4'>
                        Manage Students for a selected Book from a list of all Books.
                    </div>
                    <div className='mt-6'>
                        <button className='bg-[#000842] hover:bg-[#4d5599] text-white w-[100%] h-[40px] rounded-lg' onClick={()=>{
                            navigate("/books")
                        }}>Go There!</button>
                    </div>
                </div>
            
            </div>

        </div>
    )
}
