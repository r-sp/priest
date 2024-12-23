"use client";

import { useColorStore } from "~/app/provider";
import { formatHsl } from "~/lib/format";
// import { limiter } from "~/lib/utils";

export default function ColorShade() {
  const { hsl } = useColorStore((state) => state);

  const hue = hsl.color.h; // 0-360
  // const lightness = hsl.color.l; // 0-1
  const saturation = hsl.color.s; // 0-1

  const color50 = formatHsl({
    h: hue,
    s: saturation,
    l: 1,
  });

  const color100 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.95,
  });

  const color200 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.9,
  });

  const color300 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.8,
  });

  const color400 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.7,
  });

  const color500 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.6,
  });

  const color600 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.5,
  });

  const color700 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.4,
  });

  const color800 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.3,
  });

  const color900 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.2,
  });

  const color950 = formatHsl({
    h: hue,
    s: saturation,
    l: 0.12,
  });

  return (
    <div className="grid gap-y-3">
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box" style={{ backgroundColor: color50 }}></span>
        <span className="box" style={{ backgroundColor: color100 }}></span>
        <span className="box" style={{ backgroundColor: color200 }}></span>
        <span className="box" style={{ backgroundColor: color300 }}></span>
        <span className="box" style={{ backgroundColor: color400 }}></span>
        <span className="box" style={{ backgroundColor: color500 }}></span>
        <span className="box" style={{ backgroundColor: color600 }}></span>
        <span className="box" style={{ backgroundColor: color700 }}></span>
        <span className="box" style={{ backgroundColor: color800 }}></span>
        <span className="box" style={{ backgroundColor: color900 }}></span>
        <span className="box" style={{ backgroundColor: color950 }}></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-red-50"></span>
        <span className="box bg-red-100"></span>
        <span className="box bg-red-200"></span>
        <span className="box bg-red-300"></span>
        <span className="box bg-red-400"></span>
        <span className="box bg-red-500"></span>
        <span className="box bg-red-600"></span>
        <span className="box bg-red-700"></span>
        <span className="box bg-red-800"></span>
        <span className="box bg-red-900"></span>
        <span className="box bg-red-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-orange-50"></span>
        <span className="box bg-orange-100"></span>
        <span className="box bg-orange-200"></span>
        <span className="box bg-orange-300"></span>
        <span className="box bg-orange-400"></span>
        <span className="box bg-orange-500"></span>
        <span className="box bg-orange-600"></span>
        <span className="box bg-orange-700"></span>
        <span className="box bg-orange-800"></span>
        <span className="box bg-orange-900"></span>
        <span className="box bg-orange-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-amber-50"></span>
        <span className="box bg-amber-100"></span>
        <span className="box bg-amber-200"></span>
        <span className="box bg-amber-300"></span>
        <span className="box bg-amber-400"></span>
        <span className="box bg-amber-500"></span>
        <span className="box bg-amber-600"></span>
        <span className="box bg-amber-700"></span>
        <span className="box bg-amber-800"></span>
        <span className="box bg-amber-900"></span>
        <span className="box bg-amber-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-yellow-50"></span>
        <span className="box bg-yellow-100"></span>
        <span className="box bg-yellow-200"></span>
        <span className="box bg-yellow-300"></span>
        <span className="box bg-yellow-400"></span>
        <span className="box bg-yellow-500"></span>
        <span className="box bg-yellow-600"></span>
        <span className="box bg-yellow-700"></span>
        <span className="box bg-yellow-800"></span>
        <span className="box bg-yellow-900"></span>
        <span className="box bg-yellow-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-lime-50"></span>
        <span className="box bg-lime-100"></span>
        <span className="box bg-lime-200"></span>
        <span className="box bg-lime-300"></span>
        <span className="box bg-lime-400"></span>
        <span className="box bg-lime-500"></span>
        <span className="box bg-lime-600"></span>
        <span className="box bg-lime-700"></span>
        <span className="box bg-lime-800"></span>
        <span className="box bg-lime-900"></span>
        <span className="box bg-lime-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-green-50"></span>
        <span className="box bg-green-100"></span>
        <span className="box bg-green-200"></span>
        <span className="box bg-green-300"></span>
        <span className="box bg-green-400"></span>
        <span className="box bg-green-500"></span>
        <span className="box bg-green-600"></span>
        <span className="box bg-green-700"></span>
        <span className="box bg-green-800"></span>
        <span className="box bg-green-900"></span>
        <span className="box bg-green-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-emerald-50"></span>
        <span className="box bg-emerald-100"></span>
        <span className="box bg-emerald-200"></span>
        <span className="box bg-emerald-300"></span>
        <span className="box bg-emerald-400"></span>
        <span className="box bg-emerald-500"></span>
        <span className="box bg-emerald-600"></span>
        <span className="box bg-emerald-700"></span>
        <span className="box bg-emerald-800"></span>
        <span className="box bg-emerald-900"></span>
        <span className="box bg-emerald-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-teal-50"></span>
        <span className="box bg-teal-100"></span>
        <span className="box bg-teal-200"></span>
        <span className="box bg-teal-300"></span>
        <span className="box bg-teal-400"></span>
        <span className="box bg-teal-500"></span>
        <span className="box bg-teal-600"></span>
        <span className="box bg-teal-700"></span>
        <span className="box bg-teal-800"></span>
        <span className="box bg-teal-900"></span>
        <span className="box bg-teal-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-cyan-50"></span>
        <span className="box bg-cyan-100"></span>
        <span className="box bg-cyan-200"></span>
        <span className="box bg-cyan-300"></span>
        <span className="box bg-cyan-400"></span>
        <span className="box bg-cyan-500"></span>
        <span className="box bg-cyan-600"></span>
        <span className="box bg-cyan-700"></span>
        <span className="box bg-cyan-800"></span>
        <span className="box bg-cyan-900"></span>
        <span className="box bg-cyan-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-sky-50"></span>
        <span className="box bg-sky-100"></span>
        <span className="box bg-sky-200"></span>
        <span className="box bg-sky-300"></span>
        <span className="box bg-sky-400"></span>
        <span className="box bg-sky-500"></span>
        <span className="box bg-sky-600"></span>
        <span className="box bg-sky-700"></span>
        <span className="box bg-sky-800"></span>
        <span className="box bg-sky-900"></span>
        <span className="box bg-sky-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-blue-50"></span>
        <span className="box bg-blue-100"></span>
        <span className="box bg-blue-200"></span>
        <span className="box bg-blue-300"></span>
        <span className="box bg-blue-400"></span>
        <span className="box bg-blue-500"></span>
        <span className="box bg-blue-600"></span>
        <span className="box bg-blue-700"></span>
        <span className="box bg-blue-800"></span>
        <span className="box bg-blue-900"></span>
        <span className="box bg-blue-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-indigo-50"></span>
        <span className="box bg-indigo-100"></span>
        <span className="box bg-indigo-200"></span>
        <span className="box bg-indigo-300"></span>
        <span className="box bg-indigo-400"></span>
        <span className="box bg-indigo-500"></span>
        <span className="box bg-indigo-600"></span>
        <span className="box bg-indigo-700"></span>
        <span className="box bg-indigo-800"></span>
        <span className="box bg-indigo-900"></span>
        <span className="box bg-indigo-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-violet-50"></span>
        <span className="box bg-violet-100"></span>
        <span className="box bg-violet-200"></span>
        <span className="box bg-violet-300"></span>
        <span className="box bg-violet-400"></span>
        <span className="box bg-violet-500"></span>
        <span className="box bg-violet-600"></span>
        <span className="box bg-violet-700"></span>
        <span className="box bg-violet-800"></span>
        <span className="box bg-violet-900"></span>
        <span className="box bg-violet-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-purple-50"></span>
        <span className="box bg-purple-100"></span>
        <span className="box bg-purple-200"></span>
        <span className="box bg-purple-300"></span>
        <span className="box bg-purple-400"></span>
        <span className="box bg-purple-500"></span>
        <span className="box bg-purple-600"></span>
        <span className="box bg-purple-700"></span>
        <span className="box bg-purple-800"></span>
        <span className="box bg-purple-900"></span>
        <span className="box bg-purple-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-fuchsia-50"></span>
        <span className="box bg-fuchsia-100"></span>
        <span className="box bg-fuchsia-200"></span>
        <span className="box bg-fuchsia-300"></span>
        <span className="box bg-fuchsia-400"></span>
        <span className="box bg-fuchsia-500"></span>
        <span className="box bg-fuchsia-600"></span>
        <span className="box bg-fuchsia-700"></span>
        <span className="box bg-fuchsia-800"></span>
        <span className="box bg-fuchsia-900"></span>
        <span className="box bg-fuchsia-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-pink-50"></span>
        <span className="box bg-pink-100"></span>
        <span className="box bg-pink-200"></span>
        <span className="box bg-pink-300"></span>
        <span className="box bg-pink-400"></span>
        <span className="box bg-pink-500"></span>
        <span className="box bg-pink-600"></span>
        <span className="box bg-pink-700"></span>
        <span className="box bg-pink-800"></span>
        <span className="box bg-pink-900"></span>
        <span className="box bg-pink-950"></span>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <span className="box bg-rose-50"></span>
        <span className="box bg-rose-100"></span>
        <span className="box bg-rose-200"></span>
        <span className="box bg-rose-300"></span>
        <span className="box bg-rose-400"></span>
        <span className="box bg-rose-500"></span>
        <span className="box bg-rose-600"></span>
        <span className="box bg-rose-700"></span>
        <span className="box bg-rose-800"></span>
        <span className="box bg-rose-900"></span>
        <span className="box bg-rose-950"></span>
      </div>
    </div>
  );
}
