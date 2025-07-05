import { useState } from "react";
import { AppBar } from "../Components/AppBar"
import { BlogPage } from "../Components/UserBlogs";
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
    
    const [search, setSearch] = useState(""); // controlled search
    const { userId } = useParams();
    

    
    return <div>
        <AppBar onSearchChange={setSearch} ></AppBar>
        <BlogPage userId={userId ?? ""} search={search}></BlogPage>
        
        
    </div>
}