export const StudentDetails = ({name,email,phone,id,setSearchBook}) => {

    // Component that displays details of the current student

    return (
        <div className="col-span-1 pt-8 lg:pt-16 lg:pr-8 bg-blue-550 lg:min-h-fit lg:bg-transparent">
                
                <div className="text-white font-bold text-2xl text-center pt-2">
                    Student Details
                </div>

                
                <div className="lg:ms-0 lg:me-0 ms-4 me-4 bg-[#F9D745] rounded-lg mt-3 py-6 ">
                    <div className="w-full ">
                        <img src="/images/StudentAvatar.png" className="object-contain flex mx-auto"></img>
                    </div>
                    <div className="mt-6 text-black">
                        <div className=" w-4/5 mx-auto">
                            <div className="text-sm text-gray-600">Name</div>
                            {name}
                        </div>
                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600">Email</div>
                            {email}
                        </div>

                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600">Phone</div>
                            {phone}
                        </div>

                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600">Id</div>
                            {id}
                        </div>
                    </div>
                    
                </div>
                
                {/* Allowing to search for a book among the books lent to the student */}
                <div className="my-8 flex justify-center w-full pt-2 px-4 text-white lg:hidden">
                    <input onChange={(e)=>setSearchBook(e.target.value)} type="text" placeholder="Search By Book Title" className="rounded-xl text-black text-sm sm:w-4/5 w-full"></input>
                </div>
                
            </div>
    )
}