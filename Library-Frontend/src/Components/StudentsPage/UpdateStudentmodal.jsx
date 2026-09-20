'use client';
import { Modal } from 'flowbite-react';
import { Button } from '@material-tailwind/react';
import { useState,useRef } from 'react';
import { useEffect } from 'react';
import { updateStudent } from '../../API/StudentApi';
export const UpdateStudentModal = ({details,openModal,setOpenModal}) => {

    // State variables for the updated fields entered
    const [name,setName]=useState("");
    const [phone, setPhone]=useState("");
    const [rollNo,setRollNo]=useState("");
    const [email, setEmail]=useState("");
  
    // State varaibles for the error in the updated fields entered
    const [erroremail, setErroremail]=useState("");
    const [errorphone, setErrorphone]=useState("");
    const [errorname, setErrorname]=useState("");
    var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    var regPhone=/^[0-9]{10}$/g;

  const handleEmailChange=(e)=>{
        let text=e.target.value;
        if(!text.match(regEmail)) setErroremail("Invalid Email Address")
        else setErroremail("")
        setEmail(text)
    }

    const handlePhoneChange=(e)=>{
        let text=e.target.value;
        if(!text.match(regPhone)) setErrorphone("Phone Number must be 10 digits")
        else setErrorphone("")
        setPhone(text);
        
    }

    const handleNameChange=(e)=>{
       setName(e.target.value)
        setErrorname("")
    }

    useEffect(()=>{
        setName(details?.name);
        setPhone(details?.phone);
        setEmail(details?.email);
        setRollNo(details?.rollNo);
    },[openModal])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(phone=="" || email=="" || name=="" ){
            if(email=="") setErroremail("Required Field");
            if(phone=="") setErrorphone("Required Field");
            if(name=="") setErrorname("Required Field");
        }

        else if(erroremail=="" && errorphone=="" && errorname=="" )
        {
            // Updating the student of the same roll No with the new fields
            await updateStudent({
                rollNo: rollNo,
                email: email,
                name: name,
                phone: phone
            })
            setOpenModal(undefined);
            window.location.reload();
        }
    }

  return (
    <>
      <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} size="md"  >

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

                        <div className=" w-4/5 mx-auto">
                            <div className="text-sm text-gray-600 ">Name</div>
                            <input type="text" className="border-0 border-b-2  border-black text-[16px] mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter student name" defaultValue={name} onBlur={handleNameChange}  />

                            <div className="mt-1 text-red-600 text-sm">{errorname}</div>

                        </div>
                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600 ">Email</div>
                            <input type="email" className="border-0 border-b-2  border-black text-[16px] mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter email addresss" defaultValue={email} onBlur={handleEmailChange}/>

                            <div className="mt-1 text-red-600 text-sm">{erroremail}</div>

                        </div>

                        <div className="mt-4 w-4/5 mx-auto">
                             <div className="text-sm text-gray-600 ">Phone</div>
                            <input type="text" className="border-0 border-b-2  border-black text-[16px] mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter phone number" defaultValue={phone} onBlur={handlePhoneChange}/>

                            <div className="mt-1 text-red-600 text-sm">{errorphone}</div>

                        </div>

                        {/* Student roll no cannot be updated */}
                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600 ">Rollno</div>
                            <input type="text" className="border-0 border-b-2  border-black text-[16px] mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter roll number" disabled defaultValue={rollNo}/>

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


