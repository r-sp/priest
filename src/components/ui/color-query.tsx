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
        <PreviewColor color={color} error={query.error} />
      ) : (
        <ResolveColor error={query.error!} />
      )}
    </Suspense>
  );
}

interface ColorDisplay {
  color: AnyColorMode;
  error?: string;
  modal?: boolean;
}

function PreviewColor({ color, error, modal }: ColorDisplay) {
  const currentCss = formatCss(color);
  const hex = createHex(color);
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
          <Link
            aria-label={"download color"}
            href={`/color/${hex.replace("#", "")}`}
            prefetch={false}
            rel="alternate"
            className="flex"
            style={{ ["--bg" as string]: currentCss }}
          >
            <div className="bg-ref aspect-cinema inline-flex w-full rounded-md"></div>
          </Link>
          <div role="none" className="grid">
            <h1 className="text-lg text-gray-800 dark:text-gray-200">
              <code>{currentCss}</code>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              <code>{hex}</code>
            </p>
          </div>
        </div>
        {error && <NoticeColor color={color} error={error} />}
        <ColorContrast color={color} />
        <ColorHarmony color={color} />
      </article>
    </div>
  );
}

interface ColorError {
  error: string;
  modal?: boolean;
}

function ResolveColor({ error, modal }: ColorError) {
  const title = error.replaceAll("-", " ");
  return (
    <div className={modal ? undefined : "px-4"}>
      <article className="max-w-8xl mx-auto grid w-full gap-y-4">
        <h1 className="text-xl text-gray-800 dark:text-gray-200">{title}</h1>
      </article>
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
