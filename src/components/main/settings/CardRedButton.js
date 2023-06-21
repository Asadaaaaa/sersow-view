import font from '@/app/font.module.css';

export default function CardRedButton({ text, disabled, clickHandler, children }) {
  return (
    <div className="py-1 px-2">
      <button 
        disabled={disabled}
        className={`${font.Satoshi_c2bold} text-white bg-gradient-to-b from-rose-500 to to-rose-600 rounded-3xl py-2 px-4`}
        onClick={clickHandler}
      >
        {text}
        {children}
      </button>
    </div>
  );
}