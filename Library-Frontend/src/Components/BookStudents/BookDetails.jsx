export const BookDetails = ({title,author,description,code}) => {

    // Component that displays details of the current book

    return (
        <div className="col-span-1 pt-8 lg:pt-16 lg:pr-8 bg-blue-550 lg:min-h-fit lg:bg-transparent">
                
                <div className="text-white font-bold text-2xl text-center pt-2">
                    Book Details
                </div>

                
                <div className="lg:ms-0 lg:me-0 ms-4 me-4 bg-[#F9D745] rounded-lg mt-3 py-6 ">
                    <div className="w-full ">
                        <img src="/images/Bigbook.png" className="object-contain flex mx-auto"></img>
                    </div>
                    <div className="mt-6 text-black">
                        <div className=" w-4/5 mx-auto">
                            <div className="text-sm text-gray-600">Title</div>
                            {title}
                        </div>
                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600">Author</div>
                            {author}
                        </div>

                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600">Description</div>
                            {description}
                        </div>

                        <div className="mt-4 w-4/5 mx-auto">
                            <div className="text-sm text-gray-600">Code</div>
                            {code}
                        </div>
                    </div>
                    
                </div>

        </div>
    )
}