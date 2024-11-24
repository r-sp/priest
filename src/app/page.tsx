import { type Metadata } from "next";

import ColorHarmony from "~/components/ui/color-harmony";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Colors",
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <section aria-label="color">
      <ColorHarmony />
    </section>
  );
}
