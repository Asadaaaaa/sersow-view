
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';

export default function BackButton() {

  const router = useRouter();

  return (
    <div className="h-full flex gap-2 py-3 pl-6 pr-8 border-solid border-slate-700 border-r-[1px]">
      <div 
        className="cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <FaChevronLeft className="w-5 h-5 text-slate-200" />
      </div>
    </div>
  );
}