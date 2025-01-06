import { type ColorState } from "~/context/session";
import useColorStore from "./useColorStore";

export default function useColor(): [ColorState, (color: ColorState) => void] {
  const { rgb, hsl, hwb, lab, lch, oklab, oklch, setColor } = useColorStore(
    (state) => state,
  );

  return [{ rgb, hsl, hwb, lab, lch, oklab, oklch }, setColor];
}
