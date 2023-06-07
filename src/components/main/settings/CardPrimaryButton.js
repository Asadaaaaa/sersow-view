import font from '@/app/font.module.css';

export default function CardPrimaryButton({ text, disabled, clickHandler, children }) {
  return (
    <div className="py-1 px-2">
      <button 
        disabled={disabled}
        className={`${font.Satoshi_c2bold} text-white bg-gradient-to-b from-purple-500 to to-violet-600 rounded-3xl py-2 px-4`}
        onClick={clickHandler}
      >
        {text}
        {children}
      </button>
    </div>
  );
}