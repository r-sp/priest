import useSharedStore from "./useSharedStore";

export default function useGamut(): [boolean, (p3: boolean) => void] {
  return useSharedStore((state) => [state.gamut, state.setGamut]);
}
