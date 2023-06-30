import font from '@/app/font.module.css';

export default function Input({ placeholder, type, value, onChange, maxLength, error, onFocus, refs=null }) {
  return (
    <input
      spellCheck={"false"} 
      className={`${font.Satoshi_b2regular} text-white w-[220px] sm:w-[270px] md:w-[350px] ${placeholder === "Email" ? "pl-3 md:pl-6 pr-20 sm:pr-24 md:pr-28" : "px-3 md:px-6"} py-2 md:py-3 bg-transparent outline-none border-solid border-2 focus:border-white rounded-lg ${error ? "border-rose-400 hover:border-rose-400": "border-slate-700 hover:border-slate-500"}`} 
      type={type} 
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      ref={refs}
    />
  );
}