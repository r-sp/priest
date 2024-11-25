import { type Metadata } from "next";

import ColorDetails from "~/components/ui/color-details";

export const metadata: Metadata = {
  title: "Color",
  description: "The Holy Colors",
};

export const dynamic = "force-dynamic";

export default function ColorPage() {
  return (
    <section aria-label="color">
      <ColorDetails />
    </section>
  );
}
