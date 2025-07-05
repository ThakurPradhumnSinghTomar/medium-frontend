import { Auth } from "../Components/SignInAuth";
import { Quote } from "../Components/Quote";

export function SignIn() {
    return <div className=" flex flex-col lg:flex-row lg:justify-between">
        <div className="lg:w-1/2 mt-40 mx-30"><Auth type="signin"></Auth></div>
        <div className="lg:w-1/2"><Quote></Quote></div>
    </div>
}