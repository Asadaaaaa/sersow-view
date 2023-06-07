import font from '@/app/font.module.css';

export default function CardSecondaryButton({ text, disabled, clickHandler }) {
  return (
    <div className="py-1 px-2">
      <button 
        disabled={disabled}
        className={`${font.Satoshi_c2bold} text-white bg-transparent border-solid border-slate-300 border-[1px] rounded-3xl py-2 px-4`}
        onClick={clickHandler}
      >
        {text}
      </button>
    </div>
  );
}