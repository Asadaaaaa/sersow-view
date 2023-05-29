import Image from "next/image";

import sersow from "../../public/images/sersow.png";

export default function Loading() {
  return (
    <main className="w-screen h-screen bg-slate-950 flex justify-center items-center">
      <Image src={sersow} alt="sersow" className="w-32 h-auto" />
    </main>
  );
}