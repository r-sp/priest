import { InputSlider, ColorHue, ColorPalettes } from "~/components/ui";

export default function HomePage() {
  return (
    <article className="grid gap-y-8 px-4">
      <header className="mx-auto grid w-full max-w-3xl gap-y-6 pt-6">
        <h1 className="sr-only" id="content">
          Color Palettes
        </h1>
        <InputSlider />
        <ColorHue />
      </header>
      <section
        aria-labelledby="content"
        className="max-w-8xl mx-auto grid w-full pb-8"
      >
        <ColorPalettes />
      </section>
    </article>
  );
}
