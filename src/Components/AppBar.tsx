import { useCurrentUser } from "../hooks";
import { Link } from 'react-router-dom';



type AppBarProps = {
  onSearchChange: (value: string) => void;
};




export const AppBar = ({ onSearchChange }: AppBarProps) => {
    const getInitial = (name: string) => name.charAt(0).toUpperCase();
    const image = useCurrentUser().image;
    
    const userName = useCurrentUser().userName;
    const userId = useCurrentUser().userId;

    return (
        <div className="app-bar flex flex-row pt-3 px-4 lg:pr-10 items-center lg:justify-between border-b border-gray-200 pb-1">
            
            <div className="flex flex-row">
                <Link to={`/blog`}>
                <h1 className="text-2xl font-bold pl-2 font-serif ">Medium</h1>
                </Link>
                <div className="w-full max-w-sm lg:min-w-[200px] pl-4 pr-4">
                    <div className="relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                        </svg>
                    
                        <input
                        className="w-20 lg:w-full placeholder:text-gray-700 text-slate-700 text-sm rounded-4xl pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 bg-gray-50 focus:shadow"
                        placeholder="Search" 
                         onChange={(e) => onSearchChange(e.target.value)}
                        />
                        
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center pb-2">
                <div className="flex flex-row pt-1.5 lg:pt-0 pr-6 pl-2 lg:pl-0 lg:pr-8 justify-center items-center">
                    <Link to="/blog/create">
                        <div className="flex flex-row pr-4 text-gray-500 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <div className="pr-2 pl-2">Write</div>
                        </div>
                    </Link>

                    <div className="text-gray-500 hidden lg:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                        </svg>

                    </div>

                 </div>
                 <Link to={`/user/profile/${userId}`}>
                    <div className="app-logo items-center">
                        
                            {image ? (
                                <img src={image} alt="App Logo" className="rounded-full w-7 h-7" />
                            ) : (
                                <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                                    <span className="text-white text-lg">{getInitial(userName)}</span>
                                </div>
                                )}
                    </div>
                </Link>

            </div>
        </div>
    );
}