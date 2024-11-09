import { type Metadata } from "next";

import { ChromaProvider } from "~/components/chroma/provider";
import Chroma from "~/components/chroma";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Colors",
};

export default function HomePage() {
  return (
    <div className="priest">
      <ChromaProvider>
        <Chroma />
      </ChromaProvider>
    </div>
  );
}
