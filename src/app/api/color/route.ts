import type { NextRequest } from "next/server";
import { getParams, getValues, getColor } from "../utils";

export async function GET(request: NextRequest) {
  const [colorMode, searchParams] = getParams(request.nextUrl.searchParams);

  const value = getValues(searchParams);
  const currentColor = getColor(colorMode, value);

  return Response.json(
    {
      mode: colorMode,
      color: currentColor,
      dataset: value,
    },
    {
      status: 200,
    },
  );
}
