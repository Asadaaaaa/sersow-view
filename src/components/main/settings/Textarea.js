import TextareaAutosize from 'react-textarea-autosize';

import font from '@/app/font.module.css';

export default function Textarea({ placeholder, type, value, onChange, maxLength, error, onFocus }) {
  return (
    <TextareaAutosize
      minRows={1}
      spellCheck={"false"}
      className={`${font.Satoshi_c1regular} !resize-none py-3 px-6 border-solid text-white border-[1px] bg-transparent outline-none focus:border-white rounded-lg ${error ? "border-rose-400 hover:border-rose-400": "border-slate-700 hover:border-slate-500"}`} 
      type={type} 
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
}