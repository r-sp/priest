import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";
import { slugify, hexify } from "~/utils/string";
import { convertRgb, switchPathMode } from "~/lib/color";
import { colorsNamed } from "culori/fn";
import { Wrapper } from "~/components";
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

  const red: WebColor[] = [
    { name: "DarkRed", hex: hexify(color.darkred) },
    { name: "Red", hex: hexify(color.red) },
    { name: "Firebrick", hex: hexify(color.firebrick) },
    { name: "Crimson", hex: hexify(color.crimson) },
    { name: "IndianRed", hex: hexify(color.indianred) },
    { name: "LightCoral", hex: hexify(color.lightcoral) },
    { name: "Salmon", hex: hexify(color.salmon) },
    { name: "DarkSalmon", hex: hexify(color.darksalmon) },
    { name: "LightSalmon", hex: hexify(color.lightsalmon) },
  ];

  const brown: WebColor[] = [
    { name: "Maroon", hex: hexify(color.maroon) },
    { name: "Brown", hex: hexify(color.brown) },
    { name: "SaddleBrown", hex: hexify(color.saddlebrown) },
    { name: "Sienna", hex: hexify(color.sienna) },
    { name: "Chocolate", hex: hexify(color.chocolate) },
    { name: "DarkGoldenrod", hex: hexify(color.darkgoldenrod) },
    { name: "Peru", hex: hexify(color.peru) },
    { name: "RosyBrown", hex: hexify(color.rosybrown) },
    { name: "Goldenrod", hex: hexify(color.goldenrod) },
    { name: "SandyBrown", hex: hexify(color.sandybrown) },
    { name: "Tan", hex: hexify(color.tan) },
    { name: "Burlywood", hex: hexify(color.burlywood) },
    { name: "Wheat", hex: hexify(color.wheat) },
    { name: "NavajoWhite", hex: hexify(color.navajowhite) },
    { name: "Bisque", hex: hexify(color.bisque) },
    { name: "BlanchedAlmond", hex: hexify(color.blanchedalmond) },
    { name: "Cornsilk", hex: hexify(color.cornsilk) },
  ];

  const orange: WebColor[] = [
    { name: "OrangeRed", hex: hexify(color.orangered) },
    { name: "Tomato", hex: hexify(color.tomato) },
    { name: "DarkOrange", hex: hexify(color.darkorange) },
    { name: "Coral", hex: hexify(color.coral) },
    { name: "Orange", hex: hexify(color.orange) },
  ];

  const yellow: WebColor[] = [
    { name: "DarkKhaki", hex: hexify(color.darkkhaki) },
    { name: "Gold", hex: hexify(color.gold) },
    { name: "Khaki", hex: hexify(color.khaki) },
    { name: "PeachPuff", hex: hexify(color.peachpuff) },
    { name: "Yellow", hex: hexify(color.yellow) },
    { name: "PaleGoldenrod", hex: hexify(color.palegoldenrod) },
    { name: "Moccasin", hex: hexify(color.moccasin) },
    { name: "PapayaWhip", hex: hexify(color.papayawhip) },
    { name: "LightGoldenrodYellow", hex: hexify(color.lightgoldenrodyellow) },
    { name: "LemonChiffon", hex: hexify(color.lemonchiffon) },
    { name: "LightYellow", hex: hexify(color.lightyellow) },
  ];

  const green: WebColor[] = [
    { name: "DarkGreen", hex: hexify(color.darkgreen) },
    { name: "Green", hex: hexify(color.green) },
    { name: "DarkOliveGreen", hex: hexify(color.darkolivegreen) },
    { name: "ForestGreen", hex: hexify(color.forestgreen) },
    { name: "SeaGreen", hex: hexify(color.seagreen) },
    { name: "Olive", hex: hexify(color.olive) },
    { name: "OliveDrab", hex: hexify(color.olivedrab) },
    { name: "MediumSeaGreen", hex: hexify(color.mediumseagreen) },
    { name: "LimeGreen", hex: hexify(color.limegreen) },
    { name: "Lime", hex: hexify(color.lime) },
    { name: "SpringGreen", hex: hexify(color.springgreen) },
    { name: "MediumSpringGreen", hex: hexify(color.mediumspringgreen) },
    { name: "DarkSeaGreen", hex: hexify(color.darkseagreen) },
    { name: "MediumAquamarine", hex: hexify(color.mediumaquamarine) },
    { name: "YellowGreen", hex: hexify(color.yellowgreen) },
    { name: "LawnGreen", hex: hexify(color.lawngreen) },
    { name: "Chartreuse", hex: hexify(color.chartreuse) },
    { name: "LightGreen", hex: hexify(color.lightgreen) },
    { name: "GreenYellow", hex: hexify(color.greenyellow) },
    { name: "PaleGreen", hex: hexify(color.palegreen) },
  ];

  const cyan: WebColor[] = [
    { name: "Teal", hex: hexify(color.teal) },
    { name: "DarkCyan", hex: hexify(color.darkcyan) },
    { name: "LightSeaGreen", hex: hexify(color.lightseagreen) },
    { name: "CadetBlue", hex: hexify(color.cadetblue) },
    { name: "DarkTurquoise", hex: hexify(color.darkturquoise) },
    { name: "MediumTurquoise", hex: hexify(color.mediumturquoise) },
    { name: "Turquoise", hex: hexify(color.turquoise) },
    { name: "Aqua", hex: hexify(color.aqua) },
    { name: "Cyan", hex: hexify(color.cyan) },
    { name: "Aquamarine", hex: hexify(color.aquamarine) },
    { name: "PaleTurquoise", hex: hexify(color.paleturquoise) },
    { name: "LightCyan", hex: hexify(color.lightcyan) },
  ];

  const blue: WebColor[] = [
    { name: "MidnightBlue", hex: hexify(color.midnightblue) },
    { name: "Navy", hex: hexify(color.navy) },
    { name: "DarkBlue", hex: hexify(color.darkblue) },
    { name: "MediumBlue", hex: hexify(color.mediumblue) },
    { name: "Blue", hex: hexify(color.blue) },
    { name: "RoyalBlue", hex: hexify(color.royalblue) },
    { name: "SteelBlue", hex: hexify(color.steelblue) },
    { name: "DodgerBlue", hex: hexify(color.dodgerblue) },
    { name: "DeepSkyBlue", hex: hexify(color.deepskyblue) },
    { name: "CornflowerBlue", hex: hexify(color.cornflowerblue) },
    { name: "SkyBlue", hex: hexify(color.skyblue) },
    { name: "LightSkyBlue", hex: hexify(color.lightskyblue) },
    { name: "LightSteelBlue", hex: hexify(color.lightsteelblue) },
    { name: "LightBlue", hex: hexify(color.lightblue) },
    { name: "PowderBlue", hex: hexify(color.powderblue) },
  ];

  const purple: WebColor[] = [
    { name: "RebeccaPurple", hex: hexify(color.rebeccapurple) },
    { name: "Indigo", hex: hexify(color.indigo) },
    { name: "Purple", hex: hexify(color.purple) },
    { name: "DarkMagenta", hex: hexify(color.darkmagenta) },
    { name: "DarkViolet", hex: hexify(color.darkviolet) },
    { name: "DarkSlateBlue", hex: hexify(color.darkslateblue) },
    { name: "BlueViolet", hex: hexify(color.blueviolet) },
    { name: "DarkOrchid", hex: hexify(color.darkorchid) },
    { name: "Fuchsia", hex: hexify(color.fuchsia) },
    { name: "Magenta", hex: hexify(color.magenta) },
    { name: "SlateBlue", hex: hexify(color.slateblue) },
    { name: "MediumSlateBlue", hex: hexify(color.mediumslateblue) },
    { name: "MediumOrchid", hex: hexify(color.mediumorchid) },
    { name: "MediumPurple", hex: hexify(color.mediumpurple) },
    { name: "Orchid", hex: hexify(color.orchid) },
    { name: "Violet", hex: hexify(color.violet) },
    { name: "Plum", hex: hexify(color.plum) },
    { name: "Thistle", hex: hexify(color.thistle) },
    { name: "Lavender", hex: hexify(color.lavender) },
  ];

  const pink: WebColor[] = [
    { name: "MediumVioletRed", hex: hexify(color.mediumvioletred) },
    { name: "DeepPink", hex: hexify(color.deeppink) },
    { name: "PaleVioletRed", hex: hexify(color.palevioletred) },
    { name: "HotPink", hex: hexify(color.hotpink) },
    { name: "LightPink", hex: hexify(color.lightpink) },
    { name: "Pink", hex: hexify(color.pink) },
  ];

  const white: WebColor[] = [
    { name: "MistyRose", hex: hexify(color.mistyrose) },
    { name: "AntiqueWhite", hex: hexify(color.antiquewhite) },
    { name: "Line", hex: hexify(color.linen) },
    { name: "Beige", hex: hexify(color.beige) },
    { name: "WhiteSmoke", hex: hexify(color.whitesmoke) },
    { name: "LavenderBlush", hex: hexify(color.lavenderblush) },
    { name: "OldLace", hex: hexify(color.oldlace) },
    { name: "AliceBlue", hex: hexify(color.aliceblue) },
    { name: "SeaSheel", hex: hexify(color.seashell) },
    { name: "GhostWhite", hex: hexify(color.ghostwhite) },
    { name: "Honeydew", hex: hexify(color.honeydew) },
    { name: "FloralWhite", hex: hexify(color.floralwhite) },
    { name: "Azure", hex: hexify(color.azure) },
    { name: "MintCream", hex: hexify(color.mintcream) },
    { name: "Snow", hex: hexify(color.snow) },
    { name: "Ivory", hex: hexify(color.ivory) },
    { name: "White", hex: hexify(color.white) },
  ];

  const black: WebColor[] = [
    { name: "Black", hex: hexify(color.black) },
    { name: "DarkSlateGray", hex: hexify(color.darkslategray) },
    { name: "DimGray", hex: hexify(color.dimgray) },
    { name: "SlateGray", hex: hexify(color.slategray) },
    { name: "Gray", hex: hexify(color.gray) },
    { name: "LightSlateGray", hex: hexify(color.lightslategray) },
    { name: "DarkGray", hex: hexify(color.darkgray) },
    { name: "Silver", hex: hexify(color.silver) },
    { name: "LightGray", hex: hexify(color.lightgray) },
    { name: "Gainsboro", hex: hexify(color.gainsboro) },
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
              href={switchPathMode(convertRgb(c.hex))}
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
