
import { useEffect, useState } from "react";
import { AutoResizeTextarea } from "../Components/AutoresizeTextArea";
import { useCurrentUser, useGetBlog } from "../hooks";
import axios from "axios";
import type {UpdateBlogInput } from "pradhumn-commons-new-one";
import { backendUrl } from "../config";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';



export const UpdateBlog = () => {

    const { postId } = useParams();
    const post = useGetBlog(postId ?? "").blog;
    const [title, setTitle] = useState(post.title || "");
    const [content, setContent] = useState(post.content || "");

    useEffect(() => {
    if (post) {
        setTitle(post.title || "");
        setContent(post.content || "");
    }
}, [post]);
    

    const getInitial = (name: string) => name.charAt(0).toUpperCase();
    const image = useCurrentUser().image;
    const userName = useCurrentUser().userName;
    const userId = useCurrentUser().userId;
    const [isLoading, setIsLoading] = useState(false);

   const body = {
        title,
        content,
       
        
    } as UpdateBlogInput;

   async function UpdatePost(body:UpdateBlogInput){
        try {
            setIsLoading(true);
        const response = await axios.put(
            `${backendUrl}/app/v1/blog/update/${postId}`,
            {
                title: body.title,
                content: body.content,
                
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        //if response is success add a alert that blog created
        alert("Blog Updated Successfully")
        setIsLoading(false);
        return response.data;
    } catch (e) {
        console.error("Failed to create post:", e);
        alert("Failed to Update Blog")
        setIsLoading(false);
    }
    }

    

    
    

   return <div className="min-h-screen flex flex-col justify-between">
    <div className="lg:mx-40">
        <div>
            <div className="app-bar flex flex-row pt-3 px-4 lg:pr-10 items-center justify-between pb-1">
            
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
                                    UpdatePost(body);
                                } else {
                                    alert("User ID is missing. Please log in again.");
                                }
                            }}
                            className={`focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300 font-medium text-xs px-3 py-1 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700 rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                        {isLoading ? "Updating..." : "Update"}
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

            <div className="flex flex-col p-4 lg:pl-60 pt-10 space-y-4">
                {/* Title input */}
                <AutoResizeTextarea placeholder="Title" onChange={e=>setTitle(e.target.value)} value={title}/>
                <div className="h-1 bg-gray-200 w-full"></div>
                {/* Body input using textarea */}
                <AutoResizeTextarea placeholder="Tell your story..." onChange={e => setContent(e.target.value)} value={content}/>

                

                
            </div>


            
        </div>
        
   </div>
   <div className="bg-gray-50 w-full py-27 mt-4">
    <div className="flex flex-row text-gray-500 justify-center items-center ">
                <div className="flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <div className="text-xl px-4">Update Title And Content</div>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                </div>


            </div>
   </div>
   </div>
}