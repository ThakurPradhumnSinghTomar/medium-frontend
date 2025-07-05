
interface ProfileBarProps {
    userName: string;
    userImage?: string | null;
    CreationDate: String

}

export const ProfileBar = ({userName, userImage, CreationDate}: ProfileBarProps) => {
    
    const getInitial = (name: string) => name.charAt(0).toUpperCase();
    return (
        <div className="profile-bar flex flex-row pt-4 px-4 items-center">
            <div className="profile-image cursor-pointer">
                {userImage ? (
                    <img src={userImage} alt="User Profile" className="rounded-full w-7 h-7" />
                ) : (
                    <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-white text-lg">{getInitial(userName)}</span>
                    </div>
                )}
            </div>
            <div className="profile-info flex flex-row items-center pl-2">
                <h2 className="text-md font-semibold text-gray-700 cursor-pointer">{userName}</h2>
            <span className="text-gray-400 text-lg leading-none px-2">•</span>
            <p className="text-md text-gray-500">{CreationDate}</p>
            </div>
        </div>
    );
}

