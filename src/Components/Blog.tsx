import { ProfileBar } from "./ProfileBar";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';

interface BlogProps {
    title: string;
    content: string;
    image?: string | null;
    tags?: string[] | null;
    creationDate?: string;
    authorId: string;
    id: string;
    author : {
        name: string;
        image?: string | null;
    }
}

interface PostsArrayProps {
    blogs: BlogProps[];
    loading: boolean;
}

interface BlogComponentProps {
    postsArray: PostsArrayProps;
    imageShow: boolean;
}

export const Blog = ({ postsArray, imageShow }: BlogComponentProps) => {
    
    
    
    const posts = postsArray.blogs;
    
    
    return (
        <div className={`${imageShow ? 'pt-18' : 'pt-4'}`}>
            {
                postsArray.loading ? (
                    <div className=""><Skeleton count={5} /></div>
                ) : (
                    //check here if posts is empty
                    posts.length === 0 ? (<div className="pl-10">No Such Blog Available.</div>) : (posts.map((post) => (
                    <div className="pl-8 mt-12">
            <div>

               {
                imageShow? ( <Link to={`/user/profile/${post.authorId}`}>
                    {post.author ? (
                        <ProfileBar 
                            userName={post.author.name || "Unknown Author"} 
                            CreationDate={post.creationDate?.toString() ?? "02 Oct, 2023"} 
                            userImage={post.author.image ?? "/profile0.png"} 
                        />
                              ) : (
                        <ProfileBar 
                            userName="Unknown Author" 
                            CreationDate={post.creationDate?.toString() ?? "02 Oct, 2023"} 
                            userImage="/profile0.png" 
                        />
                    )}

                </Link>):(null)
               }

            </div>
            <div className={`blog-container p-4 flex flex-col-reverse lg:flex-row lg:justify-between ${imageShow ? 'lg:pr-50' : 'lg:pr-2'} pb-6`}>



                {/* Text Section */}
                <div className={` pt-8 lg:pt-0 ${imageShow ? 'lg:w-4/5' : 'lg:w-full'} `}>
                    <Link to={`/blog/read/${post.id}`}>
                        <h2 className="text-xl font-bold cursor-pointer">{post.title}</h2>
                    </Link>
                    <p className="text-gray-700 pt-2 min-h-25">
                        {post.content.substring(0, 365) + "..."}
                    </p>

                    {/* Bottom Bar */}
                    <div className="flex flex-row justify-between items-center pt-8">

                        {/* Left: Tags and Reading Time */}
                        <div className="flex flex-row items-center gap-4">
                            {post.tags && (
                                <div className="p-1 bg-gray-100 rounded-sm text-sm font-semibold text-gray-500 cursor-pointer">
                                    {post.tags[0]}
                                </div>
                            )}
                            <div className="text-gray-500 text-sm font-semibold cursor-pointer">
                                {`${Math.ceil(post.content.length / 100)} min read`}
                            </div>
                        </div>

                        {/* Right: SVG Icons */}
                        <div className="flex flex-row gap-4 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>

               <div>{imageShow?( <div className="blog-image flex justify-center items-center max-w-40">
                    {<img
                        src={post.image || "/blog2.png"}
                        alt="Blog"
                        className="w-30 max-h-50 lg:max-h-40 lg:w-full object-cover rounded-md cursor-pointer"
                    />}
                </div>):(null)}</div>
               
            </div>
            <div className="h-1 w-full bg-slate-100"></div>
        </div>
                )))
                )
            }
        </div>
    );
};
