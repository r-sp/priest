import { InputCss } from "~/features";
import { ColorInput, ColorMode, ColorView } from "~/components";

export default function HomePage() {
  return (
    <div className="px-4">
      <div className="mx-auto grid max-w-3xl gap-y-8">
        <ColorView />
        <InputCss />
        <ColorInput />
        <ColorMode />
      </div>
    </div>
  );
}
