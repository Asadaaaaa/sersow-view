import font from '@/app/font.module.css';

export default function CardLabelUserName({ username }) {
  return (
    <p className={`${font.Satoshi_c1medium} text-slate-300`}>{username}</p>
  );
}