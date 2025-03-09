import { notFound } from "next/navigation";

const getParams = (request: URLSearchParams): [string, string] => {
  const colorMode = ["rgb", "hsl", "hwb", "lab", "lch", "oklab", "oklch"];
  for (const mode of colorMode) {
    const value = request.get(mode);
    if (value) {
      return [mode, value];
    }
  }
  notFound();
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

const getColor = (
  param: string,
  value: number[],
): { [key in string]: number } => {
  let response = {};
  switch (param) {
    case "rgb": {
      response = { r: value[0], g: value[1], b: value[2] };
      break;
    }
    case "hsl": {
      response = { h: value[0], s: value[1], l: value[2] };
      break;
    }
    case "hwb": {
      response = { h: value[0], w: value[1], b: value[2] };
      break;
    }
    case "lab":
    case "oklab": {
      response = { l: value[0], a: value[1], b: value[2] };
      break;
    }
    case "lch":
    case "oklch": {
      response = { l: value[0], c: value[1], h: value[2] };
      break;
    }
  }
  return response;
};

export { getParams, getValues, getColor };
