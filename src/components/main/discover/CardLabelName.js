import font from '@/app/font.module.css';

export default function CardLabelname({ name }) {
  return (
    <h3 className={`${font.Satoshi_c2regular} text-white`}>{name}</h3>
  );
}