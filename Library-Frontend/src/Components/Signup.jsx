import { Design } from "./Common/Design"
import { Register } from "./Signup/Register"
export default function Signup(){
    return (
        <div className="grid grid-cols-1 nlg:grid-cols-2">
            <Design/>
            <Register/>
        </div>
    )
}