import { Button } from "@material-tailwind/react"
import { Link } from "react-router-dom"

export const Register=()=>{
    return (
        <div>
            <div className="nlg:hidden font-bold text-xl ml-[15%] mt-10">
                Book Lending Application
            </div>
        <div className=" mt-10 nlg:mt-[11vh] ml-[15%]">
            <div className="font-bold text-3xl">
                Sign Up
            </div>
            <div className="mt-6">
                If you already have an account register
            </div>

            <div className="mt-2">
                You can <Link to={`/login`} className="text-blue-250 font-extrabold">Login Here!</Link>
            </div>

            <div className="mt-14 w-4/5">
                <form>
                    <div className="mt-2">
                        <div className="text-sm text-gray-600">Email</div>
                        <input type="email" className="border-0 border-b-2  border-black text-sm mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  w-full" placeholder="Enter your email addresss" />
                    </div>

                    <div className="mt-10">
                        <div className="text-sm text-gray-600">Username</div>
                        <input type="text" className="border-0 border-b-2  border-black text-sm mt-1  focus:ring-0 focus:border-black px-0 placeholder:text-blue-550  w-full" placeholder="Enter your User name" />
                    </div>

                    <div className="mt-10">
                        <div className="text-sm text-gray-600">Password</div>
                        
                        <input type="password" className="border-0 border-b-2  border-black text-sm mt-1  focus:ring-0 px-0 placeholder:text-blue-550 focus:border-black w-full" placeholder="Enter your password" />
                    </div>
                    
                    <div className="mt-10">
                        <div className="text-sm text-gray-600">Confirm Password</div>
                        
                        <input type="password" className="border-0 border-b-2  border-black text-sm mt-1  focus:ring-0 px-0 placeholder:text-blue-550 focus:border-black w-full" placeholder="Confirm your password" />
                    </div>

                    <div className="flex justify-center mt-12">
                        <Button className="bg-blue-250 w-full rounded-xl py-4">Register</Button>
                    </div>
                    
                    
                </form>
            </div>
        </div>
        </div>
    )
}