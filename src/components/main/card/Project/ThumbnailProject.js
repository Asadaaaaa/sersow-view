import Image from "next/image";

export default function ThumbnailProject({thumbnail}) {
  return (
    <div className="flex justify-center items-center">
      {thumbnail !== null ? (
        <Image
          src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + thumbnail["data"] }
          width={1020}
          height={1020}
          className="h-auto w-80 object-cover "
        />
      ) : (null)}
    </div>
  );
}
