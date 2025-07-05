interface LabeledInputProps {
  label: string;
  placeholder: string;
  onChange? : (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const LabeledInput = ({ label, placeholder,onChange,type}: LabeledInputProps)=> {
    return <div className="flex flex-col justify-center pt-5">
        <div className="font-semibold">{label}</div>
        <input onChange={onChange} className="border border-gray-500 rounded-sm mt-1 p-1 bg-gray-50" type={type||"text"} placeholder={placeholder} />
    </div>
}