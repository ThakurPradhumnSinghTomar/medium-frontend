import { useState } from "react";
import { AppBar } from "../Components/AppBar";
import { Blog } from "../Components/Blog";
import { useBlogs, useSearchBlogs } from "../hooks";



export function Blogs() {
   

 const [search, setSearch] = useState(""); // controlled search
  const allBlogs = useBlogs();
  const searchResults = useSearchBlogs(search);

  const blogsToShow = search ? searchResults.blogs : allBlogs.blogs;
  const isLoading = search ? searchResults.loading : allBlogs.loading;
    
    
    return <div>
        <div className="fixed top-0 w-full z-50 bg-white shadow-sm shadow-black/1"><AppBar onSearchChange={setSearch} ></AppBar></div>
        <Blog postsArray={{
          blogs: blogsToShow,
          loading: isLoading
        }} imageShow={true} />
    </div>
}

