import { AdLibHeader } from "./AdminLibrarian/AdLibHeader";
import { AdLibTable } from "./AdminLibrarian/AdLibTable";
import { Button } from "@material-tailwind/react";
import { AdLibDetails } from "./AdminLibrarian/AdLibDetails";
export default function AdminLibrarian(){
    // Page for admins to view, add and delete librarians
    return (
        <div className="bg-blue-550 min-h-screen pb-6">
            <AdLibHeader/>

            <div className="mt-4 grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                <AdLibTable/>
                <div className="hidden lg:block">
                    <AdLibDetails />
                </div>
            </div>
        </div>
    )
}