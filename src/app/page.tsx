import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-black h-screen flex flex-col p-9 gap-10">
      <Link
        className="p-7 items-center justify-center hover:text-sky-400"
        href="/full-page-sliders"
      >
        Full Page Sliders
      </Link>
      <Link
        className="p-7 items-center justify-center hover:text-sky-400"
        href="/auto-height-sliders"
      >
        Auto Height Sliders
      </Link>
    </div>
  );
}
