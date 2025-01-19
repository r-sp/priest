import type { ReactNode } from "react";
import { InputCss } from "~/features";
import ColorMode from "./mode";
import ColorView from "./view";
import ColorInput from "./input";

export default function ColorPicker({ children }: { children?: ReactNode }) {
  return (
    <div className="max-w-8xl mx-auto grid w-full gap-x-4 gap-y-6 md:grid-cols-2">
      <div className="grid content-baseline gap-y-6">
        <ColorView />
        <ColorInput />
      </div>
      <div className="grid content-baseline gap-y-6">
        <InputCss />
        <ColorMode />
        {children}
      </div>
    </div>
  );
}
