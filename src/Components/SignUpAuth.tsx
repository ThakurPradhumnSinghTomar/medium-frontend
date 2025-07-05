
import { Link, useNavigate } from "react-router-dom"
import { LabeledInput } from "./LabeledInput"
import { Button } from "./Button"
import { useState } from "react"
import axios from "axios"
import type { SignUpInput } from "pradhumn-commons-new-one"
import { backendUrl } from "../config";
export const Auth = ({type} : {type : "signup"}) => {

     const [postInputs, setPostInputs] = useState<SignUpInput>(
        
             { name: "", email: "", password: "", image : "" }    )

     const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function sendRequest(){
        try{
            setIsLoading(true); // Start blocking signup
            const response = await axios.post(
                `${backendUrl}/app/v1/user/signup`,
                postInputs
            );
            if(response.status === 201 || response.status === 200){
                localStorage.setItem("token", response.data.token);
                setIsLoading(false); // Start blocking signup
                navigate("/blog");
            }
        }
        catch(err){
            console.error("Error during SignUp:", err);
            setIsLoading(false);
            alert("SignUp failed. Please check your credentials.");
        }
    }


    return <div className="flex flex-col justify-center">
            <div>
                    <div className="text-xl lg:text-3xl font-extrabold flex justify-center items-center">
                    
                        Create an account
                    
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center pt-2 text-gray-500 text-sm lg:text-base">
                        <div className="">
                            Already have an account?
                            </div>
                        <Link to={"/signin"} className="pl-1 underline decoration-gray-500">
                            "Login"
                        </Link>
                    </div>
            </div>
            <div>
                <div className="pt-5">{
                    <LabeledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }}></LabeledInput>
                    }
                    </div>
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

                <div className="pt-4">
                    <label className="block font-medium mb-1">Upload Profile Image</label>
                    <input
                        className="bg-gray-200 rounded-sm p-2 w-full text-sm font-semibold text-gray-500"
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setIsLoading(true); // Start blocking signup

                        const reader = new FileReader();
                        reader.onload = async (event) => {
                            const img = new Image();
                            img.onload = async () => {
                            const canvas = document.createElement("canvas");
                            canvas.width = 800;
                            canvas.height = 800;

                            const ctx = canvas.getContext("2d");
                            if (!ctx) return alert("Canvas context error");

                            // Compute cropping square from the center of original image
                            const size = Math.min(img.width, img.height);
                            const cropX = (img.width - size) / 2;
                            const cropY = (img.height - size) / 2;

                            ctx.drawImage(
                                img,
                                cropX, cropY, size, size, // source rectangle (cropped)
                                0, 0, canvas.width, canvas.height // destination (full canvas)
                            );

                            canvas.toBlob(async (blob) => {
                                if (!blob) return alert("Failed to process image");

                                const formData = new FormData();
                                formData.append("file", blob, "cropped.jpg");
                                formData.append("upload_preset", "unsigned_preset");
                                formData.append("cloud_name", "ddnbzbnqe");

                                try {
                                const res = await axios.post(
                                    "https://api.cloudinary.com/v1_1/ddnbzbnqe/image/upload",
                                    formData
                                );
                                setPostInputs({
                                    ...postInputs,
                                    image: res.data.secure_url,
                                });
                                alert("Image uploaded successfully");
                                } catch (err) {
                                alert("Upload failed");
                                } finally {
                                setIsLoading(false); // Done uploading
                                }
                            }, "image/jpeg");
                            };
                            img.src = event.target?.result as string;
                        };
                        reader.readAsDataURL(file);
                        }}
                    />
                    </div>


                <div className=" mt-4"><Button isLoading={isLoading} onClick={sendRequest} buttonType={type}></Button></div>
            </div>

            
    </div>
}

