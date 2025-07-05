
import { useState } from "react";
import { AutoResizeTextarea } from "../Components/AutoresizeTextArea";
import { useCurrentUser } from "../hooks";
import axios from "axios";
import type { PostInput } from "pradhumn-commons-new-one";
import { backendUrl } from "../config";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export const CreateBlog = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [Blogimage, setBlogImage] = useState<String | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [inputTags, setInputTags] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const getInitial = (name: string) => name.charAt(0).toUpperCase();
    const image = useCurrentUser().image;
    const userName = useCurrentUser().userName;
    const userId = useCurrentUser().userId;

   const body = {
        title,
        content,
        tags,
        image: Blogimage,
        
    } as PostInput;

   async function CreatePost(body:PostInput){
        try {
        setIsLoading(true); // Start blocking create post
        const response = await axios.post(
            `${backendUrl}/app/v1/blog/create`,
            {
                title: body.title,
                content: body.content,
                tags: body.tags,
                image: body.image,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        //if response is success add a alert that blog created
        alert("Blog Created Successfully")
        setIsLoading(false); // Stop blocking create post

         // Clear the form fields after successful creation
        // Redirect to the newly created blog post
        navigate(`/blog/read/${response.data.post.id}`);

         // Assuming the response contains the postId
         // You can also return the response data if needed
        return response.data;
    } catch (e) {
        console.error("Failed to create post:", e);
        setIsLoading(false); // Stop blocking create post
        alert("Failed to create Blog")
    }
    }

    

    
    

   return <div className="min-h-screen flex flex-col justify-between">
    <div className="lg:mx-40">
        <div>
            <div className="app-bar flex flex-row pt-3 px-4 pr-10 items-center justify-between pb-1">
            
            <div className="flex flex-row">
                <div className="flex flex-row ">
                    <Link to={`/blog`}>
                <h1 className="text-2xl font-bold pl-2 font-serif ">Medium</h1>
                </Link>
                    <h3 className="pl-3 pt-2 text-sm hidden lg:flex">{`Draft in ${userName}`}</h3>
                </div>
            </div>
            <div className="flex flex-row items-center pb-2">
                <div className="flex flex-row pr-8 justify-center items-center">
                    <div className="flex flex-row pr-4 text-gray-500 pt-2">
                            <button
                            type="button"
                            onClick={() => {
                                if (userId) {
                                    CreatePost(body);
                                } else {
                                    alert("User ID is missing. Please log in again.");
                                }
                            }}
                            className={`focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300 font-medium text-xs px-3 py-1 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700 rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                            {
                                isLoading ? "Wait.." : "Publish"
                            }
                            </button>                    
                    </div>

                    <div className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                        </svg>

                    </div>

                 </div>
                <div className="app-logo items-center">
                        {image ? (
                            <img src={image} alt="App Logo" className="rounded-full w-7 h-7" />
                        ) : (
                            <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-white text-lg">{getInitial(userName)}</span>
                            </div>
                            )}
                </div>

            </div>
        </div>

            <div className="flex flex-col pl-8 pr-4 lg:pl-60 pt-10 space-y-4">
                {/* Title input */}
                <AutoResizeTextarea placeholder="Title" onChange={e=>setTitle(e.target.value)} value={title}/>

                {/* Body input using textarea */}
                <AutoResizeTextarea placeholder="Tell your story..." onChange={e => setContent(e.target.value)} value={content}/>

                <AutoResizeTextarea placeholder="Add tags (comma separated)" onChange={e=>{
                    const tagsInput = e.target.value;
                    setInputTags(tagsInput);
                    const tagsArray = tagsInput.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
                    setTags(tagsArray);
                }} value={inputTags} ></AutoResizeTextarea>

                <div className="pt-4">
                    <label className="block font-medium mb-1">Upload Blog Image</label>
                        <input
                    className="rounded-sm p-2 w-full text-sm font-semibold text-gray-500 border border-gray-200"
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsLoading(true); // Start blocking signup

                        // Step 1: Read image into HTMLImageElement
                        const reader = new FileReader();
                        reader.onload = async (event) => {
                        const img = new Image();
                        img.onload = async () => {
                            const targetAspectRatio = 1 / 1.42; // 2:1

                            // Step 2: Calculate cropping area
                            const imgAspectRatio = img.width / img.height;
                            let cropWidth = img.width;
                            let cropHeight = img.height;
                            let offsetX = 0;
                            let offsetY = 0;

                            if (imgAspectRatio > targetAspectRatio) {
                            // Image is wider than 2:1 → crop horizontally
                            cropWidth = img.height * targetAspectRatio;
                            offsetX = (img.width - cropWidth) / 2;
                            } else {
                            // Image is taller than 2:1 → crop vertically
                            cropHeight = img.width / targetAspectRatio;
                            offsetY = (img.height - cropHeight) / 2;
                            }

                            // Step 3: Draw cropped area onto canvas
                            const canvas = document.createElement("canvas");
                            canvas.width = 600;  // Final width (you can adjust)
                            canvas.height = 800; // Final height (2:1 ratio)

                            const ctx = canvas.getContext("2d");
                            if (!ctx) return alert("Canvas context error");

                            ctx.drawImage(
                            img,
                            offsetX,
                            offsetY,
                            cropWidth,
                            cropHeight,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                            );

                            // Step 4: Convert canvas to Blob
                            canvas.toBlob(async (blob) => {
                            if (!blob) return alert("Failed to process image");

                            const formData = new FormData();
                            formData.append("file", blob, "cropped.jpg");
                            formData.append("upload_preset", "unsigned_preset"); // Your preset
                            formData.append("cloud_name", "ddnbzbnqe");

                            try {
                                const res = await axios.post(
                                "https://api.cloudinary.com/v1_1/ddnbzbnqe/image/upload",
                                formData
                                );
                                setBlogImage(res.data.secure_url);
                                setIsLoading(false); // Start blocking signup
                            } catch (err) {
                                console.error("Image upload failed", err);
                                alert("Image upload failed. Please try again.");
                                setIsLoading(false); // Start blocking signup
                            }
                            }, "image/jpeg");
                        };

                        img.src = event.target?.result as string;
                        };

                        reader.readAsDataURL(file);
                    }}
                    />


                </div>

                
            </div>


            
        </div>
        
   </div>
   <div className="bg-gray-50 w-full py-27 mt-4">
    <div className="flex flex-row text-gray-500 justify-center items-center ">
                <div className="flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <div className="text-xl px-4">Writing On Medium</div>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                </div>


            </div>
   </div>
   </div>
}