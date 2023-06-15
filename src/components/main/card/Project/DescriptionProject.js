import font from "@/app/font.module.css";

export default function DescriptionProject({description}) {
  return (
    <div className="my-4 text-justify">
      <p className={`${font.Satoshi_c2medium}`}>{description}</p>
    </div>
  );
}
