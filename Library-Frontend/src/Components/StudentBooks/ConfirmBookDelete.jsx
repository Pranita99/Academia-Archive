'use client';
import { Modal } from 'flowbite-react';
import { Button } from '@material-tailwind/react';
import { returnBook } from '../../API/TransactionApi';
export const ConfirmBookDelete = ({id,openModal,setOpenModal}) => {
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      await returnBook(id);
      setOpenModal(undefined);
      window.location.reload();
  }

  return (
    <>
      {/* Modal that asks user if they want to return */}
      <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} size="sm"  >
        {/* Close button */}
        <div className="flex items-start justify-between rounded-t dark:border-gray-600 p-5 bg-[#F9D745]">
            <div>
                <button aria-label="Close" className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" type="button" onClick={() => setOpenModal(undefined)}>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>
        
        <div className='bg-[#F9D745] flex items-center justify-center py-4'>
             <img className="h-[70px] w-[70px]" src="/images/delete.png" ></img>
        </div>

        <div className='bg-[#F9D745]'>
            <div className="mt-6 text-black">
                    
                <div className=" w-4/5 mx-auto">
                    <div className="text-sm text-gray-600 text-center">Are you Sure you want to return this book?</div>
                </div>
                
                <div className="flex justify-center mx-auto w-4/5 my-8">
                    <Button className="bg-blue-550 w-full rounded-xl py-4 text-white" onClick={handleSubmit}>Confirm Return</Button>
                </div>

            </div>
        </div>
        
        
      </Modal>
    </>
  )
}


