import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";
import { slugify } from "~/lib/utils";
import { formatPathMode, convertRgb, colorsNamed } from "~/lib/color";
import { Wrapper } from "~/components/ui";
import Link from "next/link";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "web-colors" });

  return {
    ...meta,
    title: "Web Colors",
    description:
      "Red, Brown, Orange, Yellow, Green, Cyan, Blue, Purple, Violet, Magenta, Pink, White, Gray and Black",
  };
}

type WebColor = {
  name: string;
  hex: string;
};

export default function WebColorsPage() {
  const color = colorsNamed;
  const web = (denote: number): string => {
    const hex = denote.toString(16).padStart(6, "0");
    return `#${hex}`;
  };

  const red: WebColor[] = [
    { name: "DarkRed", hex: web(color.darkred) },
    { name: "Red", hex: web(color.red) },
    { name: "Firebrick", hex: web(color.firebrick) },
    { name: "Crimson", hex: web(color.crimson) },
    { name: "IndianRed", hex: web(color.indianred) },
    { name: "LightCoral", hex: web(color.lightcoral) },
    { name: "Salmon", hex: web(color.salmon) },
    { name: "DarkSalmon", hex: web(color.darksalmon) },
    { name: "LightSalmon", hex: web(color.lightsalmon) },
  ];

  const brown: WebColor[] = [
    { name: "Maroon", hex: web(color.maroon) },
    { name: "Brown", hex: web(color.brown) },
    { name: "SaddleBrown", hex: web(color.saddlebrown) },
    { name: "Sienna", hex: web(color.sienna) },
    { name: "Chocolate", hex: web(color.chocolate) },
    { name: "DarkGoldenrod", hex: web(color.darkgoldenrod) },
    { name: "Peru", hex: web(color.peru) },
    { name: "RosyBrown", hex: web(color.rosybrown) },
    { name: "Goldenrod", hex: web(color.goldenrod) },
    { name: "SandyBrown", hex: web(color.sandybrown) },
    { name: "Tan", hex: web(color.tan) },
    { name: "Burlywood", hex: web(color.burlywood) },
    { name: "Wheat", hex: web(color.wheat) },
    { name: "NavajoWhite", hex: web(color.navajowhite) },
    { name: "Bisque", hex: web(color.bisque) },
    { name: "BlanchedAlmond", hex: web(color.blanchedalmond) },
    { name: "Cornsilk", hex: web(color.cornsilk) },
  ];

  const orange: WebColor[] = [
    { name: "OrangeRed", hex: web(color.orangered) },
    { name: "Tomato", hex: web(color.tomato) },
    { name: "DarkOrange", hex: web(color.darkorange) },
    { name: "Coral", hex: web(color.coral) },
    { name: "Orange", hex: web(color.orange) },
  ];

  const yellow: WebColor[] = [
    { name: "DarkKhaki", hex: web(color.darkkhaki) },
    { name: "Gold", hex: web(color.gold) },
    { name: "Khaki", hex: web(color.khaki) },
    { name: "PeachPuff", hex: web(color.peachpuff) },
    { name: "Yellow", hex: web(color.yellow) },
    { name: "PaleGoldenrod", hex: web(color.palegoldenrod) },
    { name: "Moccasin", hex: web(color.moccasin) },
    { name: "PapayaWhip", hex: web(color.papayawhip) },
    { name: "LightGoldenrodYellow", hex: web(color.lightgoldenrodyellow) },
    { name: "LemonChiffon", hex: web(color.lemonchiffon) },
    { name: "LightYellow", hex: web(color.lightyellow) },
  ];

  const green: WebColor[] = [
    { name: "DarkGreen", hex: web(color.darkgreen) },
    { name: "Green", hex: web(color.green) },
    { name: "DarkOliveGreen", hex: web(color.darkolivegreen) },
    { name: "ForestGreen", hex: web(color.forestgreen) },
    { name: "SeaGreen", hex: web(color.seagreen) },
    { name: "Olive", hex: web(color.olive) },
    { name: "OliveDrab", hex: web(color.olivedrab) },
    { name: "MediumSeaGreen", hex: web(color.mediumseagreen) },
    { name: "LimeGreen", hex: web(color.limegreen) },
    { name: "Lime", hex: web(color.lime) },
    { name: "SpringGreen", hex: web(color.springgreen) },
    { name: "MediumSpringGreen", hex: web(color.mediumspringgreen) },
    { name: "DarkSeaGreen", hex: web(color.darkseagreen) },
    { name: "MediumAquamarine", hex: web(color.mediumaquamarine) },
    { name: "YellowGreen", hex: web(color.yellowgreen) },
    { name: "LawnGreen", hex: web(color.lawngreen) },
    { name: "Chartreuse", hex: web(color.chartreuse) },
    { name: "LightGreen", hex: web(color.lightgreen) },
    { name: "GreenYellow", hex: web(color.greenyellow) },
    { name: "PaleGreen", hex: web(color.palegreen) },
  ];

  const cyan: WebColor[] = [
    { name: "Teal", hex: web(color.teal) },
    { name: "DarkCyan", hex: web(color.darkcyan) },
    { name: "LightSeaGreen", hex: web(color.lightseagreen) },
    { name: "CadetBlue", hex: web(color.cadetblue) },
    { name: "DarkTurquoise", hex: web(color.darkturquoise) },
    { name: "MediumTurquoise", hex: web(color.mediumturquoise) },
    { name: "Turquoise", hex: web(color.turquoise) },
    { name: "Aqua", hex: web(color.aqua) },
    { name: "Cyan", hex: web(color.cyan) },
    { name: "Aquamarine", hex: web(color.aquamarine) },
    { name: "PaleTurquoise", hex: web(color.paleturquoise) },
    { name: "LightCyan", hex: web(color.lightcyan) },
  ];

  const blue: WebColor[] = [
    { name: "MidnightBlue", hex: web(color.midnightblue) },
    { name: "Navy", hex: web(color.navy) },
    { name: "DarkBlue", hex: web(color.darkblue) },
    { name: "MediumBlue", hex: web(color.mediumblue) },
    { name: "Blue", hex: web(color.blue) },
    { name: "RoyalBlue", hex: web(color.royalblue) },
    { name: "SteelBlue", hex: web(color.steelblue) },
    { name: "DodgerBlue", hex: web(color.dodgerblue) },
    { name: "DeepSkyBlue", hex: web(color.deepskyblue) },
    { name: "CornflowerBlue", hex: web(color.cornflowerblue) },
    { name: "SkyBlue", hex: web(color.skyblue) },
    { name: "LightSkyBlue", hex: web(color.lightskyblue) },
    { name: "LightSteelBlue", hex: web(color.lightsteelblue) },
    { name: "LightBlue", hex: web(color.lightblue) },
    { name: "PowderBlue", hex: web(color.powderblue) },
  ];

  const purple: WebColor[] = [
    { name: "RebeccaPurple", hex: web(color.rebeccapurple) },
    { name: "Indigo", hex: web(color.indigo) },
    { name: "Purple", hex: web(color.purple) },
    { name: "DarkMagenta", hex: web(color.darkmagenta) },
    { name: "DarkViolet", hex: web(color.darkviolet) },
    { name: "DarkSlateBlue", hex: web(color.darkslateblue) },
    { name: "BlueViolet", hex: web(color.blueviolet) },
    { name: "DarkOrchid", hex: web(color.darkorchid) },
    { name: "Fuchsia", hex: web(color.fuchsia) },
    { name: "Magenta", hex: web(color.magenta) },
    { name: "SlateBlue", hex: web(color.slateblue) },
    { name: "MediumSlateBlue", hex: web(color.mediumslateblue) },
    { name: "MediumOrchid", hex: web(color.mediumorchid) },
    { name: "MediumPurple", hex: web(color.mediumpurple) },
    { name: "Orchid", hex: web(color.orchid) },
    { name: "Violet", hex: web(color.violet) },
    { name: "Plum", hex: web(color.plum) },
    { name: "Thistle", hex: web(color.thistle) },
    { name: "Lavender", hex: web(color.lavender) },
  ];

  const pink: WebColor[] = [
    { name: "MediumVioletRed", hex: web(color.mediumvioletred) },
    { name: "DeepPink", hex: web(color.deeppink) },
    { name: "PaleVioletRed", hex: web(color.palevioletred) },
    { name: "HotPink", hex: web(color.hotpink) },
    { name: "LightPink", hex: web(color.lightpink) },
    { name: "Pink", hex: web(color.pink) },
  ];

  const white: WebColor[] = [
    { name: "MistyRose", hex: web(color.mistyrose) },
    { name: "AntiqueWhite", hex: web(color.antiquewhite) },
    { name: "Line", hex: web(color.linen) },
    { name: "Beige", hex: web(color.beige) },
    { name: "WhiteSmoke", hex: web(color.whitesmoke) },
    { name: "LavenderBlush", hex: web(color.lavenderblush) },
    { name: "OldLace", hex: web(color.oldlace) },
    { name: "AliceBlue", hex: web(color.aliceblue) },
    { name: "SeaSheel", hex: web(color.seashell) },
    { name: "GhostWhite", hex: web(color.ghostwhite) },
    { name: "Honeydew", hex: web(color.honeydew) },
    { name: "FloralWhite", hex: web(color.floralwhite) },
    { name: "Azure", hex: web(color.azure) },
    { name: "MintCream", hex: web(color.mintcream) },
    { name: "Snow", hex: web(color.snow) },
    { name: "Ivory", hex: web(color.ivory) },
    { name: "White", hex: web(color.white) },
  ];

  const black: WebColor[] = [
    { name: "Black", hex: web(color.black) },
    { name: "DarkSlateGray", hex: web(color.darkslategray) },
    { name: "DimGray", hex: web(color.dimgray) },
    { name: "SlateGray", hex: web(color.slategray) },
    { name: "Gray", hex: web(color.gray) },
    { name: "LightSlateGray", hex: web(color.lightslategray) },
    { name: "DarkGray", hex: web(color.darkgray) },
    { name: "Silver", hex: web(color.silver) },
    { name: "LightGray", hex: web(color.lightgray) },
    { name: "Gainsboro", hex: web(color.gainsboro) },
  ];

  return (
    <Wrapper as="article" className="grid gap-y-8" outerStyle="py-4">
      <header className="inline-grid w-full">
        <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
          Web Colors
        </h1>
        <ul className="pl-4">
          <li className="list-disc">
            <a href="#red">Red</a>
          </li>
          <li className="list-disc">
            <a href="#brown">Brown</a>
          </li>
          <li className="list-disc">
            <a href="#orange">Orange</a>
          </li>
          <li className="list-disc">
            <a href="#yellow">Yellow</a>
          </li>
          <li className="list-disc">
            <a href="#green">Green</a>
          </li>
          <li className="list-disc">
            <a href="#cyan">Cyan</a>
          </li>
          <li className="list-disc">
            <a href="#blue">Blue</a>
          </li>
          <li className="list-disc">
            <a href="#purple-violet-and-magenta">Purple, Violet, and Magenta</a>
          </li>
          <li className="list-disc">
            <a href="#pink">Pink</a>
          </li>
          <li className="list-disc">
            <a href="#white">White</a>
          </li>
          <li className="list-disc">
            <a href="#gray-and-black">Gray and Black</a>
          </li>
        </ul>
      </header>
      <Section color={red} label="Red" />
      <Section color={brown} label="Brown" />
      <Section color={orange} label="Orange" />
      <Section color={yellow} label="Yellow" />
      <Section color={green} label="Green" />
      <Section color={cyan} label="Cyan" />
      <Section color={blue} label="Blue" />
      <Section color={purple} label="Purple, Violet and Magenta" />
      <Section color={pink} label="Pink" />
      <Section color={white} label="White" />
      <Section color={black} label="Gray and Black" />
    </Wrapper>
  );
}

function Section({ color, label }: { color: WebColor[]; label: string }) {
  const section = slugify(label);

  return (
    <section aria-labelledby={section} className="inline-grid gap-y-4">
      <div
        role="none"
        className="border-t border-t-neutral-400 pt-4 dark:border-t-neutral-700"
      >
        <h2
          id={section}
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </h2>
      </div>
      <ul className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {color.map((c, i) => (
          <li key={i} className="inline-grid">
            <Link
              href={formatPathMode(convertRgb(c.hex))}
              className="grid w-full gap-2 rounded-lg"
            >
              <div
                role="presentation"
                className="frame inline-grid w-full rounded-lg"
              >
                <span style={{ backgroundColor: c.hex }}></span>
              </div>
              <p className="inline-grid">
                <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                  {c.name}
                </span>
                <code className="text-sm">{c.hex}</code>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
