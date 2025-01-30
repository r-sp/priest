import { ColorView, InputCss, InputSlider } from "~/components/ui";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-8 px-4">
      <div className="mx-auto grid w-full max-w-3xl gap-y-4">
        <InputCss />
        <ColorView />
        <InputSlider />
      </div>
    </div>
  );
}
