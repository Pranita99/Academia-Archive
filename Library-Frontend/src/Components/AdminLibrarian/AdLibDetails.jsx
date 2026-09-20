import { Button } from "@material-tailwind/react"
import { useState } from "react"
import { addLibrarian } from "../../API/TransactionApi";
import { useNavigate } from "react-router-dom";
export const AdLibDetails=()=>{

    // State variables for the details of the librarian to add
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    // State variables for the errors in the details of the librarian to add
    const [erroremail, setErroremail]=useState("");
    const [errorpassword, setErrorpassword]=useState("");
    const [errorname, setErrorname]=useState("");
    
    // regex to verify if an email is valid
    var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

    // Verifying librarian details when one is changed

    const handleEmailChange=(e)=>{
        let text=e.target.value;
        if(!text.match(regEmail)) setErroremail("Invalid Email Address")
        else setErroremail("")
        setEmail(text);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
        setErrorpassword("")
    }

    const handleNameChange=(e)=>{
        setName(e.target.value);
        setErrorname("")
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        // Performing checks
        if(password=="" || email=="" || name==""){
            if(email=="") setErroremail("Required Field");
            if(password=="") setErrorpassword("Required Field");
            if(name=="") setErrorname("Required Field");
        }
        else if(erroremail=="" && errorpassword=="" && errorname==""){
            // Sending add librarian request
            await addLibrarian({
                "username": name,
                "name": name,
                "password": password,
                "email": email
            })
            window.location.reload();
        }
        
    }

    const navigate = useNavigate();
    
    return (
        <div className="col-span-1 pt-6 lg:pr-8 bg-blue-550 min-h-screen lg:min-h-fit lg:bg-transparent ">
            {/* Header */}
            <div className="flex pt-2 px-12 text-white lg:hidden">
                <div className="flex-auto font-bold text-xl">
                    Book Lending Application
                </div>
                <div className=" pr-[20%] hidden lg:flex">
                    <input type="text" placeholder="Search" className="rounded-xl text-black text-sm"></input>
                </div>
                <div className="flex text-xl hover:cursor-pointer" onClick={async()=>{
                    await Logout();
                    navigate("/login");
                    localStorage.removeItem("jwt");
                }}>
                    Logout
                </div>
            </div>
                
            <div className="text-white font-bold text-2xl text-center pt-12">
                Add Librarian
            </div>
                
            {/* Component to add librarian */}
            <div className="lg:bg-[#F9D745] rounded-lg mt-3 py-3 ">
                
                <div className="w-full ">
                    <img src="/images/Pic1.png" className="object-contain flex mx-auto"></img>
                </div>
                
                <div className="mt-6 text-white lg:text-black">
                    <form>

                        <div className=" w-4/5 mx-auto">
                            <div className="text-sm lg:text-gray-600 text-white">Name</div>
                            <input type="name" className="border-0 border-b-2  border-white lg:border-black text-[16px] mt-1  focus:ring-0 focus:border-white lg:focus:border-black px-0 placeholder:text-white lg:placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter librarian name" value={name} onChange={handleNameChange}/>

                            <div className="mt-1 text-red-600 text-sm">{errorname}</div>
                        </div>
                        <div className="mt-8 w-4/5 mx-auto">
                            <div className="text-sm lg:text-gray-600 text-white">Email</div>
                            <input type="email" className="border-0 border-b-2   border-white lg:border-black text-[16px] mt-1  focus:ring-0 lg:focus:border-black focus:border-white px-0 placeholder:text-white lg:placeholder:text-blue-550  bg-transparent w-full" placeholder="Enter email addresss" value={email} onChange={handleEmailChange} />
                            <div className="mt-1 text-red-600 text-sm">{erroremail}</div>
                        </div>

                        <div className="mt-8 w-4/5 mx-auto">
                            <div className="text-sm lg:text-gray-600 text-white">Password</div>
                            
                            <input type="password" className="border-0 border-b-2  border-white lg:border-black text-[16px] mt-1  focus:ring-0 px-0 placeholder:text-white lg:placeholder:text-blue-550  focus:border-black lg:focus:border-black bg-transparent w-full" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
                            <div className="mt-1 text-red-600 text-sm">{errorpassword}</div>
                        </div>
                        

                        <div className="flex justify-center mx-auto w-4/5 mt-12 mb-3">
                            <Button className="bg-[#F9D745] lg:bg-blue-550 w-full rounded-xl py-4 text-blue-550 lg:text-white" onClick={handleSubmit}>Add</Button>
                        </div>
                        
                    </form>
                </div>
                    
            </div>
        </div>
    )
}