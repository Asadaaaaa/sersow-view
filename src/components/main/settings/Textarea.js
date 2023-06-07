import TextareaAutosize from 'react-textarea-autosize';

import font from '@/app/font.module.css';

export default function Textarea({ minRows, placeholder, value, onChange, maxLength, error, onFocus }) {
  return (
    <TextareaAutosize
      minRows={minRows}
      spellCheck={"false"}
      className={`${font.Satoshi_c1regular} !resize-none py-3 px-6 border-solid text-white border-[1px] bg-transparent outline-none focus:border-white rounded-lg ${error ? "border-rose-400 hover:border-rose-400": "border-slate-700 hover:border-slate-500"}`} 
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
}