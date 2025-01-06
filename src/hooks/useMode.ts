import { type ColorFormat } from "~/lib/types";
import useSharedStore from "./useSharedStore";

export default function useMode(): [
  ColorFormat,
  (format: ColorFormat) => void,
] {
  return useSharedStore((state) => [state.mode, state.setMode]);
}
