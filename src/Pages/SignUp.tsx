import { Auth } from "../Components/SignUpAuth";
import { Quote } from "../Components/Quote";

export function SignUp() {
    return <div className="flex flex-col lg:flex-row lg:justify-between ">
        <div className="lg:w-1/2 mt-30 mx-10 md:mx-30 lg:mx-0 lg:px-20"><Auth type="signup"></Auth></div>
        <div className="lg:w-1/2"><Quote></Quote></div>
    </div>
}