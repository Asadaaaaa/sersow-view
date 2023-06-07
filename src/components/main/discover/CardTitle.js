import { FaTimes } from 'react-icons/fa';

import font from '@/app/font.module.css';

export default function CardTitle({ title, subtitle, closable, closeHandler }) {
  return (
    <div className="pb-3 border-solid border-slate-700 border-b-[1px]">
      <div className="flex justify-between items-center">
        <h1 className={`${font.Satoshi_h5bold} text-white`}>{title}</h1>
        {
          closable && (
            <div className="cursor-pointer" onClick={closeHandler}>
              <FaTimes className="w-4 h-4 text-white" />
            </div>
          )
        }
      </div>
      {
        subtitle && (
          <p className={`${font.Satoshi_c2regular} text-slate-400 pt-1`}>{subtitle}</p>
        )
      }
    </div>
  );
}