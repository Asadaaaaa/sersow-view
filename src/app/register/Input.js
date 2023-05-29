import font from '../font.module.css';

export default function Input({ placeholder, type, value, onChange, maxLength, error, onFocus }) {
  return (
    <input 
      className={`${font.Satoshi_b2regular} text-white w-[350px] ${placeholder === "Email" ? "pl-6 pr-28" : "px-6"} py-3 bg-transparent outline-none border-solid border-2 focus:border-white rounded-xl ${error ? "border-rose-400 hover:border-rose-400": "border-slate-700 hover:border-slate-500"}`} 
      type={type} 
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
}