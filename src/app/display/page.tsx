import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Color Display",
};

export default function DisplayPage() {
  return (
    <div className="py-8 sm:px-4">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Link className="frame inline-grid rounded-lg" href="/color/ff6467">
          <span className="bg-red-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/ff8904">
          <span className="bg-orange-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/ffb900">
          <span className="bg-amber-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/fdc700">
          <span className="bg-yellow-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/9ae600">
          <span className="bg-lime-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/05df72">
          <span className="bg-green-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/00d492">
          <span className="bg-emerald-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/00d5be">
          <span className="bg-teal-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/00d3f3">
          <span className="bg-cyan-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/00bcff">
          <span className="bg-sky-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/51a2ff">
          <span className="bg-blue-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/7c86ff">
          <span className="bg-indigo-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/a684ff">
          <span className="bg-violet-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/c27aff">
          <span className="bg-purple-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/ed6bff">
          <span className="bg-fuchsia-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/fb64b6">
          <span className="bg-pink-400"></span>
        </Link>
        <Link className="frame inline-grid rounded-lg" href="/color/ff637e">
          <span className="bg-rose-400"></span>
        </Link>
      </div>
    </div>
  );
}
