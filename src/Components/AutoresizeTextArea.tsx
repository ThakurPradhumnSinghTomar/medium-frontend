import { useRef, useEffect } from "react";
type Props = {
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
};
export function AutoResizeTextarea({ placeholder, className,onChange,value}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = textarea.scrollHeight + "px"; // Set to scroll height
    }
  };

  useEffect(() => {
    handleInput(); // Adjust on first render
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value|| ""}
      onInput={handleInput}
      placeholder={placeholder}
      onChange={onChange}
      className={`placeholder:text-lg font-serif min-h-[60px] w-full p-0 overflow-hidden resize-none focus:outline-none ${className || ""}`}    />
  );
}
