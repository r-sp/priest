import type { Metadata } from "next";
import type { AnyColorMode, ColorQuery } from "~/types/color";
import { formatCss, createHex } from "./format";

const getColorQuery = (query: ColorQuery): AnyColorMode | undefined => {
  const { mode, r, g, b, h, s, l, w, a, c } = query;

  switch (mode) {
    case "rgb": {
      if (r !== undefined && g !== undefined && b !== undefined) {
        return { mode, r, g, b };
      }
      break;
    }
    case "hsl": {
      if (h !== undefined && s !== undefined && l !== undefined) {
        return { mode, h, s, l };
      }
      break;
    }
    case "hwb": {
      if (h !== undefined && w !== undefined && b !== undefined) {
        return { mode, h, w, b };
      }
      break;
    }
    case "lab":
    case "oklab": {
      if (l !== undefined && a !== undefined && b !== undefined) {
        return { mode, l, a, b };
      }
      break;
    }
    case "lch":
    case "oklch": {
      if (l !== undefined && c !== undefined && h !== undefined) {
        return { mode, l, c, h };
      }
      break;
    }
    default: {
      return undefined;
    }
  }

  return undefined;
};

const getColorPath = (path: string, query: ColorQuery): string => {
  const { mode, r, g, b, h, s, l, w, a, c } = query;
  let queryString = "";

  switch (mode) {
    case "rgb": {
      if (r !== undefined && g !== undefined && b !== undefined) {
        queryString = `mode=${mode}&r=${r}&g=${g}&b=${b}`;
      }
      break;
    }
    case "hsl": {
      if (h !== undefined && s !== undefined && l !== undefined) {
        queryString = `mode=${mode}&h=${h}&s=${s}&l=${l}`;
      }
      break;
    }
    case "hwb": {
      if (h !== undefined && w !== undefined && b !== undefined) {
        queryString = `mode=${mode}&h=${h}&w=${w}&b=${b}`;
      }
      break;
    }
    case "lab":
    case "oklab": {
      if (l !== undefined && a !== undefined && b !== undefined) {
        queryString = `mode=${mode}&l=${l}&a=${a}&b=${b}`;
      }
      break;
    }
    case "lch":
    case "oklch": {
      if (l !== undefined && c !== undefined && h !== undefined) {
        queryString = `mode=${mode}&l=${l}&c=${c}&h=${h}`;
      }
      break;
    }
  }

  return queryString ? `${path}?${queryString}` : path;
};

const switchColorPath = (path: string, color: AnyColorMode): string => {
  let queryString = `mode=${color.mode}`;

  switch (color.mode) {
    case "rgb": {
      queryString += `&r=${color.r}&g=${color.g}&b=${color.b}`;
      break;
    }
    case "hsl": {
      queryString += `&h=${color.h}&s=${color.s}&l=${color.l}`;
      break;
    }
    case "hwb": {
      queryString += `&h=${color.h}&w=${color.w}&b=${color.b}`;
      break;
    }
    case "lab":
    case "oklab": {
      queryString += `&l=${color.l}&a=${color.a}&b=${color.b}`;
      break;
    }
    case "lch":
    case "oklch": {
      queryString += `&l=${color.l}&c=${color.c}&h=${color.h}`;
      break;
    }
  }

  return `${path}?${queryString}`;
};

const createMetadata = (query: ColorQuery & { error?: string }): Metadata => {
  const includes =
    query.error?.includes("under") || query.error?.includes("above");

  const createMetadata = (valid: string, invalid: string) => {
    return query.error ? (includes ? valid : invalid) : valid;
  };

  const repaint: ColorQuery =
    query.error || query.mode ? query : { mode: "rgb", r: 0, g: 0, b: 0 };

  const color = query.error
    ? includes
      ? formatCss(getColorQuery(repaint)!)
      : "Error"
    : formatCss(getColorQuery(repaint)!);

  const hex = query.error
    ? includes
      ? createHex(getColorQuery(repaint)!)
      : "#696969"
    : createHex(getColorQuery(repaint)!);

  const name = createMetadata(`Color: ${color}`, "Error");
  const text = createMetadata(
    `Explore color conversions from ${color} to various color models: RGB, HSL, HWB, LAB, LCH, OKLAB, OKLCH.`,
    "Something",
  );

  const colorParams = getColorPath("/color", query);
  const path = query.error
    ? includes
      ? `${colorParams}&error=${query.error}`
      : `/color?error=${query.error}`
    : colorParams;

  return {
    title: name,
    description: text,
    openGraph: {
      title: name,
      url: path,
      images: [
        {
          url: `/color/${hex.replace("#", "")}`,
          alt: `Color: ${color}`,
          width: 1680,
          height: 720,
          type: "image/png",
        },
      ],
    },
    alternates: { canonical: path },
  };
};

export { getColorQuery, getColorPath, switchColorPath, createMetadata };
