import type { AnyColorMode } from "~/lib/types";
import useSession from "./useSession";

export default function useColor(): [
  AnyColorMode,
  (state: AnyColorMode) => void,
] {
  const color = useSession((state) => state.color);
  const setColor = useSession((state) => state.setColor);

  return [color, setColor];
}
