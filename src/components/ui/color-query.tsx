import type { SessionQuery } from "~/types/session";
import type { AnyColorMode, ColorFormat, ExtractColor } from "~/types/color";
import { permanentRedirect } from "next/navigation";
import {
  getColorQuery,
  getColorPath,
  checkGamut,
  gamutRange,
  formatCss,
  createHex,
} from "~/utils";
import { Suspense } from "react";
import { Modal } from "../common";
import clsx from "clsx";
import Link from "next/link";
import ColorActions from "./color-actions";
import ColorContrast from "./color-contrast";
import ColorHarmony from "./color-harmony";

interface Props extends SessionQuery {
  portal: boolean;
}

export default async function ColorQuery({ searchParams, portal }: Props) {
  const query = await searchParams;
  if (!query.mode && !query.error) {
    permanentRedirect("/color?error=unknown-color-query");
  }

  const color = getColorQuery(query);
  if (!color && !query.error) {
    permanentRedirect("/color?error=unknown-color-mode");
  }

  if (color && !query.error) {
    const offset = checkGamut(color);
    if (offset) {
      permanentRedirect(`${getColorPath("/color", query)}&error=${offset}`);
    }
  }

  return (
    <Suspense>
      {portal ? (
        <Modal color={color ? formatCss(color) : "Error"}>
          {color ? (
            <PreviewColor color={color} error={query.error} modal={true} />
          ) : (
            <ResolveColor error={query.error!} modal={true} />
          )}
        </Modal>
      ) : color ? (
        <PreviewColor color={color} error={query.error} modal={false} />
      ) : (
        <ResolveColor error={query.error!} />
      )}
    </Suspense>
  );
}

interface ColorDisplay {
  color: AnyColorMode;
  error?: string;
  modal: boolean;
}

function PreviewColor({ color, error, modal }: ColorDisplay) {
  const currentCss = formatCss(color);
  const currentHex = createHex(color);
  const hex = currentHex.replace("#", "");
  return (
    <div
      className={modal ? undefined : "px-4"}
      style={{ ["--currentColor" as string]: currentCss }}
    >
      <article
        aria-label={currentCss}
        className="pointer-events-auto mx-auto grid w-full max-w-5xl gap-y-12"
      >
        <div className="grid gap-y-4">
          <div className="flex" style={{ ["--bg" as string]: currentCss }}>
            <div className="bg-ref aspect-cinema inline-flex w-full rounded-md"></div>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex grow-1 flex-col">
              <h1 className="text-lg text-gray-800 dark:text-gray-200">
                <code>{currentCss}</code>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                <code>{currentHex}</code>
              </p>
            </div>
            <ColorActions color={color} hex={hex} />
          </div>
        </div>
        {error && <NoticeColor color={color} error={error} />}
        <ColorContrast color={color} />
        <ColorHarmony color={color} modal={modal} />
      </article>
    </div>
  );
}

interface ColorError {
  error: string;
  modal?: boolean;
}

function ResolveColor({ error, modal }: ColorError) {
  const listErrorMessage: {
    id: string;
    title: string;
    text: string;
    example: string;
  }[] = [
    {
      id: "query",
      title: "Unknown Color Query",
      text: "The current param color values are must be the part of color mode",
      example: "./color?mode=rgb&r=128&g=128&b=128",
    },
    {
      id: "mode",
      title: "Unknown Color Mode",
      text: "The current param mode is not in supported color space",
      example: "./color?mode=[rgb, hsl, hwb, lab, lch, oklab, oklch]",
    },
    {
      id: "swatch",
      title: "Unknown Color Swatch",
      text: "The current path is not valid and must be hex value",
      example: "./color-swatch/808080",
    },
    {
      id: "scales",
      title: "Unknown Color Scales",
      text: "The current path is not valid and must be hex values",
      example:
        "./color-scales/e9e9e9-d4d4d4-bfbfbf-aaaaaa-959595-808080-6a6a6a-555555-404040-2a2a2a-151515",
    },
    {
      id: "harmony",
      title: "Unknown Color Harmony",
      text: "The current path is not valid and must be color values",
      example: "./color-harmony/rgb-128-128-128",
    },
  ];

  const filteredErrorMessage = listErrorMessage.filter(
    (e) => "unknown-color-" + e.id === error,
  );

  return (
    <div className={modal ? undefined : "px-4"}>
      {filteredErrorMessage[0] ? (
        filteredErrorMessage.map((item, index) => (
          <article key={index} className="mx-auto grid w-full max-w-3xl py-16">
            <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              {item.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {item.text}
            </p>
            <pre className="mt-6 flex max-w-full overflow-x-auto rounded-md bg-gray-100 px-3 py-2 ring ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
              <code className="inline-flex items-center text-gray-800 dark:text-gray-200">
                {item.example}
              </code>
            </pre>
            <div className="mt-8 flex flex-wrap select-none">
              <Link
                href="/"
                className="action inline-flex h-9 items-center justify-center rounded-md px-4 text-sm ring"
              >
                Generate new color
              </Link>
            </div>
          </article>
        ))
      ) : (
        <article className="mx-auto grid w-full max-w-3xl py-16">
          <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100">
            The current error is not detected
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            You can try to find another color
          </p>
          <div className="mt-6 flex flex-wrap select-none">
            <Link
              href="/"
              className="action inline-flex h-9 items-center justify-center rounded-md px-4 text-sm ring"
            >
              Generate new color
            </Link>
          </div>
        </article>
      )}
    </div>
  );
}

interface ColorAlert {
  color: AnyColorMode;
  error: string;
}

type ColorKeys<T extends ColorFormat> = [
  keyof ExtractColor<T>,
  keyof ExtractColor<T>,
  keyof ExtractColor<T>,
  keyof ExtractColor<T>,
];

type ColorValues<T extends ColorFormat> = [T, number, number, number];

function NoticeColor({ color, error }: ColorAlert) {
  const [offset, range] = gamutRange(color, error);
  const [startOffset, middleOffset, endOffset] = offset;
  const [startRange, middleRange, endRange] = range;

  const description = error
    .replaceAll("--", "-||")
    .replaceAll("green-red", "green||red")
    .replaceAll("blue-yellow", "blue||yellow")
    .replaceAll("-", " ")
    .replaceAll("||", "-");

  const background = (invalid: boolean): string => {
    return clsx(
      "absolute right-0 left-0 z-0 h-6",
      invalid ? "bg-red-100 dark:bg-red-950" : "bg-inherit",
    );
  };

  const foreground = (invalid: boolean, italic?: boolean): string => {
    return clsx(
      invalid ? "text-red-700 dark:text-red-400" : "text-gray-500",
      italic ? "not-italic" : "",
    );
  };

  const keys = Object.keys(color) as ColorKeys<typeof color.mode>;
  const values = Object.values(color) as ColorValues<typeof color.mode>;

  return (
    <section aria-labelledby="color-notice">
      <h2
        id="color-notice"
        className="text-lg font-semibold text-gray-800 dark:text-gray-200"
      >
        {`Color offset from ${color.mode}`}
      </h2>
      <p
        role="term"
        aria-details="color offset"
        className="text-gray-600 dark:text-gray-400"
      >
        {description}
      </p>
      <div
        role="presentation"
        className="relative z-0 mt-4 grid overflow-hidden rounded-md bg-gray-100 text-gray-700 ring ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800"
      >
        <pre
          role="definition"
          className="flex flex-col overflow-x-auto px-3 py-2"
        >
          <code aria-hidden="true">{`{`}</code>
          <code aria-hidden="true">
            <span>{`  ${keys[0]}`}</span>
            <span>{`: `}</span>
            <span>{`"${values[0]}",`}</span>
          </code>
          <code aria-describedby="start-props" className="flex items-center">
            <span className="relative z-1">
              <span>{`  ${keys[1]}: ${values[1]}, `}</span>
              <span className={foreground(startOffset)}>{"// "}</span>
              <em
                id="start-props"
                className={foreground(startOffset, true)}
              >{`${startRange}`}</em>
            </span>
            <span className={background(startOffset)}></span>
          </code>
          <code aria-describedby="middle-props" className="flex items-center">
            <span className="relative z-1">
              <span>{`  ${keys[2]} : ${values[2]}, `}</span>
              <span className={foreground(middleOffset)}>{"// "}</span>
              <em
                id="middle-props"
                className={foreground(middleOffset, true)}
              >{`${middleRange}`}</em>
            </span>
            <span className={background(middleOffset)}></span>
          </code>
          <code aria-describedby="end-props" className="flex items-center">
            <span className="relative z-1 inline-flex">
              <span>{`  ${keys[3]} : ${values[3]}, `}</span>
              <span className={foreground(endOffset)}>{"// "}</span>
              <em
                id="end-props"
                className={foreground(endOffset, true)}
              >{`${endRange}`}</em>
            </span>
            <span className={background(endOffset)}></span>
          </code>
          <code aria-hidden="true">{`}`}</code>
        </pre>
      </div>
    </section>
  );
}
