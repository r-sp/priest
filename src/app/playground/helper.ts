import { OklchColor } from "~/lib/types";

export type ColorState = {
  id: string;
  color: OklchColor;
  css: string;
};

export type ColorStates = {
  current: ColorState;
  prev: ColorState | undefined;
  next: ColorState | undefined;
};

export const currentId = (input: string) => {
  const numberMatches = input.matchAll(/-(\d+)/g);
  const numbers: number[] = [];
  for (const match of numberMatches) {
    numbers.push(parseInt(match[1], 10));
  }
  return numbers;
};

export const prevId = (key: number, variant: number) => {
  const index = key - 1;
  const shade =
    variant === 100
      ? 50
      : variant > 100 && variant < 950
        ? variant - 100
        : variant === 950
          ? variant - 50
          : 0;
  return [index, shade];
};

export const nextId = (key: number, variant: number) => {
  const index = key + 1;
  const shade =
    variant === 50
      ? 100
      : variant > 50 && variant < 900
        ? variant + 100
        : variant === 900
          ? 950
          : 0;
  return [index, shade];
};

export const findColorById = (key: number, variant: number) => {
  const colorId = `color-${key}-variant-${variant}`;
  const btn = document.getElementById(colorId) as HTMLButtonElement;
  if (!btn) return;

  const item = btn.parentElement!;
  const data = JSON.parse(btn.getAttribute("data-color")!) as OklchColor;
  const style = item.style.getPropertyValue("--bg");

  return {
    id: colorId,
    color: data,
    css: style,
  };
};

export const createColorById = ({
  id,
  color,
  css,
}: {
  id: string;
  color: OklchColor;
  css: string;
}): ColorStates => {
  const [group, variant] = currentId(id);
  const [prevGroup, prevVariant] = prevId(group, variant);
  const [nextGroup, nextVariant] = nextId(group, variant);

  const prevColor = findColorById(
    variant === 50 ? prevGroup : group,
    variant === 50 ? 950 : prevVariant,
  );

  const nextColor = findColorById(
    variant === 950 ? nextGroup : group,
    variant === 950 ? 50 : nextVariant,
  );

  return {
    current: {
      id,
      color,
      css,
    },
    prev: prevColor,
    next: nextColor,
  };
};
