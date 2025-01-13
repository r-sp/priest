import { type ColorState } from "~/context/store";
import useColorStore from "./useColorStore";

export default function useColor(): [ColorState, (color: ColorState) => void] {
  const rgb = useColorStore((state) => state.rgb);
  const hsl = useColorStore((state) => state.hsl);
  const hwb = useColorStore((state) => state.hwb);
  const lab = useColorStore((state) => state.lab);
  const lch = useColorStore((state) => state.lch);
  const oklab = useColorStore((state) => state.oklab);
  const oklch = useColorStore((state) => state.oklch);
  const setColor = useColorStore((state) => state.setColor);

  return [{ rgb, hsl, hwb, lab, lch, oklab, oklch }, setColor];
}
