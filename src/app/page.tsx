import { type Metadata } from "next";

import ColorPicker from "~/components/ui/color-picker";
import ColorPreview from "~/components/ui/color-preview";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Colors",
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <section aria-labelledby="site-name" className="px-4 xl:mx-auto xl:max-w-screen-xl">
      <ColorPicker />
      <ColorPreview />
    </section>
  );
}
