import type { NextRequest } from "next/server";
import { permanentRedirect } from "next/navigation";

const getParams = (request: URLSearchParams): [string, string] => {
  const colorMode = [
    "rgb",
    "hsl",
    "hwb",
    "lab",
    "lch",
    "oklab",
    "oklch",
    "hex",
  ];

  for (const mode of colorMode) {
    const value = request.get(mode);
    if (value) {
      return [mode, value];
    }
  }

  return ["color", "null"];
};

const getValues = (param: string): number[] => {
  const values: number[] = [];
  const parts = param.split(",");
  for (const part of parts) {
    let parse = parseFloat(part);
    if (isNaN(parse)) {
      parse = 0;
    }
    values.push(parse);
  }
  return values;
};

export async function GET(request: NextRequest) {
  const [colorMode, colorValues] = getParams(request.nextUrl.searchParams);

  if (request.nextUrl.search.split("").length === 0) {
    return permanentRedirect("/");
  }

  return Response.json(
    {
      mode: colorMode,
      value: getValues(colorValues),
    },
    {
      status: 200,
    },
  );
}
