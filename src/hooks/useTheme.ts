import { type ThemeVariant } from "~/lib/types";
import useSharedStore from "./useSharedStore";

export default function useTheme(): [
  ThemeVariant | undefined,
  (variant: ThemeVariant) => void,
] {
  return useSharedStore((state) => [state.theme, state.setTheme]);
}
