
import { Blog } from "./Blog";
import {useCurrentUser, useProfileBlogs, useSearchProfileBlogs } from "../hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { useNavigate } from "react-router-dom";



type BlogPageProps = { 
  userId: string
  search : string


 };

export const BlogPage: React.FC<BlogPageProps> = ({ userId,search}) => {

  const navigate = useNavigate();

 
  const allBlogs = useProfileBlogs(userId);
  const searchResults = useSearchProfileBlogs(search);

  const blogsToShow = search ? searchResults.blogs : allBlogs.blogs;
  const isLoading = search ? searchResults.loading : allBlogs.loading;
  const token = localStorage.getItem("token") || "";

  const [image, setImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const getInitial = (name: string) => name.charAt(0).toUpperCase();
  const [ProfileuserId, setProfileUserId] = useState<string | null>(null);
  const currentUserId = useCurrentUser().userId;

  useEffect(() => {
    const fetUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/app/v1/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        setImage(user.image); // Assuming your user object has an `image` field
        setUserName(user.name); // Assuming your user object has a `name` field
        setProfileUserId(user.id); // Assuming your user object has an `id` field
        
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }
    fetUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔓 Remove auth token
    navigate("/signin"); // 🚀 Redirect to signin
  };

  
  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen pt-10">
      {/* Main Content */}
      <div className="flex-1 p-6 lg:pl-40 max-w-4xl border-r pr-10 border-gray-200">
        <h1 className="text-4xl font-bold mb-4 hidden lg:flex">{userName}</h1>
        <nav className="flex space-x-6 text-lg font-medium border-b border-gray-200 mb-6">
          <button className="pb-2 border-b-2 border-gray-700">Home</button>
        </nav>

        {/* Pass posts to your existing blog list component */}
        {/* Assuming it's called <BlogList /> */}
        <Blog postsArray={{
          blogs: blogsToShow,
          loading: isLoading
        }} imageShow={false} />

       
      </div>

      {/* Sidebar */}
      <div className="pl-10">
        <div className="app-logo items-center">
            {image ? (
              <img src={image} alt="App Logo" className="rounded-full w-20 h-20" />) : (
                <div className="bg-gray-300 rounded-full w-20 h-20 flex items-center justify-center">
                <span className="text-white text-3xl">{getInitial(userName)}</span>
                </div> )}
          </div>

        <h2 className="mt-4 font-semibold text-2xl items-center pl-2">{userName}</h2>
        <div>{
          ProfileuserId && (ProfileuserId === currentUserId) && (
            <div className="pt-4 pl-2 pb-4 lg:pb-0 lg:pt-20">
              <button
                onClick={handleLogout}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                LogOut
              </button>
            </div>
          )
          }</div>
      </div>
    </div>
  );
};

