import {  useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: string; // or `userId`, depending on your backend
  email?: string;
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${backendUrl}/app/v1/blog/all`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlogs(response.data.posts);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
        
    }, []);

    return { blogs, loading };
}

export const useSearchBlogs = (keyword: string) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!keyword) {
            setBlogs([]);
            setLoading(false);
            return;
        }

        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/app/v1/blog/search`, {
                    params: { keyword },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlogs(response.data.posts);
            } catch (error) {
                console.error("Error searching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [keyword]);

    return { blogs, loading };
};

export const useProfileBlogs = (userId:string) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${backendUrl}/app/v1/blog/get/${userId}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlogs(response.data.posts);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
        
    }, []);

    return { blogs, loading };
}

export const useSearchProfileBlogs = (keyword: string) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!keyword) {
            setBlogs([]);
            setLoading(false);
            return;
        }

        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/app/v1/blog/profile/search`, {
                    params: { keyword },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlogs(response.data.posts);
            } catch (error) {
                console.error("Error searching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [keyword]);

    return { blogs, loading };
};


const getUserFromToken = () => {
  const token = localStorage.getItem("token"); // Or cookies, wherever you're storing it
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};



export const useCurrentUser = () => {
  const [image, setImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchUser = async () => {
    const token = localStorage.getItem("token"); // Or cookies, wherever you're storing it
    const CurrentuserId = getUserFromToken()?.id;


      try {
        const response = await axios.get(`${backendUrl}/app/v1/user/${CurrentuserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        setImage(user.image); // Assuming your user object has an `image` field
        setUserName(user.name); // Assuming your user object has a `name` field
        setUserId(user.id); // Assuming your user object has an `id` field
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, []);

  return {image, userName, userId};
};

//type of blog state
type BlogProps = {
    title: string;
    content: string;
    image?: string | null;
    tags?: string[] | null;
    creationDate?: string;
    authorId: string;
    author : {
        name: string;
    }
}
export const useGetBlog = (postId:string) => {
    const [blog, setBlog] = useState<BlogProps>({
        title: "",
        content: "",
        image: null,
        tags: [],
        creationDate: "",
        authorId: "",
        author : {
            name: ""
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${backendUrl}/app/v1/blog/post/${postId}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlog(response.data.post);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
        
    }, []);

    return { blog, loading };
}

