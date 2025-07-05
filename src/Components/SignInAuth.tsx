
import { Link, useNavigate } from "react-router-dom"
import { LabeledInput } from "./LabeledInput"
import { Button } from "./Button"
import { useState } from "react"
import axios from "axios"
import type { SignInInput } from "pradhumn-commons-new-one"
import { backendUrl } from "../config";
export const Auth = ({type} : {type : "signin"}) => {
         const [isLoading, setIsLoading] = useState(false);
     const [postInputs, setPostInputs] = useState<SignInInput>(
        
             { email: "", password: "" }    )

    const navigate = useNavigate();

    async function sendRequest(){
        try{
            setIsLoading(true); // Start blocking signin
            const response = await axios.post(
                `${backendUrl}/app/v1/user/signin`,
                postInputs
            );
            if(response.status === 201 || response.status === 200){
                localStorage.setItem("token", response.data.token);
                setIsLoading(false);
                navigate("/blog");
            }
        }
        catch(err){
            console.error("Error during SignIn:", err);
            setIsLoading(false);
            alert("SignIn failed. Please check your credentials.");
        }
    }


    return <div className="flex flex-col justify-center">
            <div>
                    <div className="text-xl lg:text-3xl font-extrabold flex justify-center items-center">
                    
                        Login to your account
                    
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center pt-2 text-gray-500 text-sm lg:text-base">
                        <div className="">
                            Don't have an account?
                            </div>
                        <Link to={"/signup"} className="pl-1 underline decoration-gray-500">
                            Sign Up
                        </Link>
                    </div>
            </div>
            <div>
                
                <div className=""><LabeledInput label="Email" placeholder="m@example.com" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }}></LabeledInput></div>
                <div className=""><LabeledInput type="password" label="Password" placeholder="" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}></LabeledInput></div>
                <div className=" mt-4"><Button onClick={sendRequest} buttonType={type} isLoading={isLoading}></Button></div>
            </div>

            
    </div>
}

