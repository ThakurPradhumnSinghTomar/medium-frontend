type ButtonProps = {
  buttonType: "signup" | "signin";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isLoading? : boolean | false

};


export const Button = ({ buttonType, onClick, isLoading }: ButtonProps) => {
  return (
    <div>
      <button
        disabled={isLoading}
        onClick={onClick}
        className={`w-full ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-900"} text-white font-bold py-2 px-4 rounded-md text-sm p-2 transition-colors duration-200`}
      >
        {isLoading
          ? (buttonType === "signup" ? "Wait..." : "Signing In...")
          : (buttonType === "signup" ? "Sign Up" : "Sign In")}
      </button>
    </div>
  );
};
