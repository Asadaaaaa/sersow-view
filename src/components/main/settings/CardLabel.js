import font from '@/app/font.module.css';

export default function CardLabel({ text }) {
  return (
    <h3 className={`${font.Satoshi_b2bold} text-white`}>{text}</h3>
  );
}