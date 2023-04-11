import font from '../font.module.css';

export default function Input({ placeholder, type }) {
  return (
    <input type={type} className={`${font.Satoshi_b2regular} text-white w-[350px] px-6 py-3 bg-transparent outline-none border-solid border-2 border-slate-700 hover:border-slate-500 focus:border-white rounded-xl`} placeholder={placeholder} />
  );
}