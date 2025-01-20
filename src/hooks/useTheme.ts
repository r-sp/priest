import type { ColorScheme } from "~/lib/types";
import useSession from "./useSession";

export default function useTheme(): [
  ColorScheme | undefined,
  (state: ColorScheme) => void,
] {
  return useSession((state) => [state.theme, state.setTheme]);
}
