import type { ColorMode } from "~/lib/types";
import useSession from "./useSession";

export default function useMode(): [ColorMode, (state: ColorMode) => void] {
  return useSession((state) => [state.mode, state.setMode]);
}
