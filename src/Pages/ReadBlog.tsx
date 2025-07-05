import { useParams } from 'react-router-dom';
import { useCurrentUser, useGetBlog } from '../hooks';
import { AppBar } from '../Components/AppBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../config';
export function ReadBlog() {
  const { postId } = useParams();
  const post = useGetBlog(postId ?? "").blog;
  const userId = useCurrentUser().userId;

  return (
    <div className="bg-white text-black min-h-screen">
      <AppBar onSearchChange={() => {}} />

      <div className="max-w-3xl mx-auto px-4 pt-16">
        {/* Title */}
        <h1 className="text-4xl font-bold leading-tight mb-4">
          {post.title}
        </h1>

        {/* Author and Meta Info */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-10">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            {post.author?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <span className="font-medium">{post.author?.name ?? "Unknown Author"}</span>
          <span>&bull;</span>
          <span>{`${Math.ceil(post.content.length / 1000)} min read`}</span>
          <span>&bull;</span>
          <span>{(post.creationDate ?? "")}</span>
        </div>

        {/* Blog Content */}
        <div className="text-lg leading-relaxed text-gray-800 space-y-6">
          {post.content?.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div>
            {
                (userId === post.authorId)?(
                    <div className="flex justify-center py-10">
                        <div className="flex space-x-8">
                           <Link to={`/blog/update/${postId}`}>
                            <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded">
                            Update
                            </button>
                            </Link>
                            <button 
                            onClick={async () => {
                            try {
                                const response = await axios.delete(
                                    `${backendUrl}/app/v1/blog/delete/${postId}`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                                        },
                                    }
                                );
                                if (response.status === 200) {
                                    alert("Blog deleted successfully");
                                    window.location.href = `/user/profile/${userId}`; // Redirect to home or another page
                                }
                            } catch (error) {
                                console.error("Failed to delete blog:", error);
                                alert("Failed to delete blog");

                            }
                        }
                    }
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded">
                            Delete
                            </button>
                        </div>
                    </div>

                ):(
                    <div className='flex items-center justify-center p-4 bg-gray-100 h-20 w-full my-4 rounded-lg mt-8'>Thanks For Reading</div>
                )
            }
        </div>
      </div>
    </div>
  );
}
