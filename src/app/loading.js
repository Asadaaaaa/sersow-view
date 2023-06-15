import Image from "next/image";
import styles from "./root.module.css";

import sersow from "../../public/images/Loading/icon.svg";

export default function Loading() {
  return (
    <main className="w-screen h-screen bg-slate-950 flex justify-center items-center">
      <div>
        <Image
          src={sersow}
          alt="sersow"
          className={`${styles.loading} w-[120px] h-auto`}
        />
      </div>
    </main>
  );
}
