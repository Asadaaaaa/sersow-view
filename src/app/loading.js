import Image from "next/image";

import sersow from "../../public/favicon.ico";

export default function Loading() {
  return (
    <main className="w-screen h-screen bg-slate-950 flex justify-center items-center">
      <Image src={sersow} alt="sersow" className="w-80 h-80" />
    </main>
  );
}