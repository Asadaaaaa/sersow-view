import font from '@/app/font.module.css';

export default function CardSubtitle({ text }) {
  return (
    <p className={`${font.Satoshi_c2medium} text-slate-400`}>{text}</p>
  );
}