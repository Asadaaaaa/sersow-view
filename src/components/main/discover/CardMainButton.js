import font from '@/app/font.module.css';

export default function CardMainButton({ children, disabled, clickHandler }) {
  return (
    <button 
      disabled={disabled}
      className={`${font.Satoshi_c1bold} flex justify-center items-center gap-2 px-[25px] py-2 text-white bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9] rounded-3xl cursor-pointer`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}