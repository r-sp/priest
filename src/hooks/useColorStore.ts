import type { AnyColorMode, ColorState } from "~/lib/types";
import useSession from "./useSession";

export default function useColorStore(): [
  ColorState,
  (state: AnyColorMode) => void,
] {
  const color = useSession((state) => state.shared);
  const setColor = useSession((state) => state.setColor);

  return [color, setColor];
}
