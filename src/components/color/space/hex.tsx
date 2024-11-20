"use client";

import { useColorProvider } from "../provider";
import { convertColor } from "~/lib/color";
import Input from "../input";

export default function ColorHex() {
  const { hex, setHex, raw, hsl } = useColorProvider();

  const updateHex = (value: string) => {
    const currentColor = convertColor(value);
    const isValidColor = currentColor.isValid();

    if (isValidColor) {
      const newColor = currentColor.minify({ alphaHex: true });

      console.log({ input: { raw, hex, hsl } });

      setHex(newColor);
    }
    return value;
  };

  return (
    <div className="input-hex">
      <label htmlFor="hex" className="sr-only">
        Hex
      </label>
      <Input
        type="text"
        name="hex"
        id="hex"
        autoCorrect="false"
        autoComplete="false"
        value={hex}
        update={(e) => updateHex(e.target.value)}
        leave={(e) => {
          if (hex !== e.target.value) {
            e.target.value = hex;
          }
        }}
        className="bg-holy-900 font-mono text-2xl font-medium text-holy-200 outline-0"
      />
    </div>
  );
}
