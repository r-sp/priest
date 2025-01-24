import { type Metadata } from "next";
import { multiply } from "~/lib/utils";

export const metadata: Metadata = {
  title: "404: Error",
  description: "Page Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="px-4">
      <div className="max-w-8xl mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {multiply(1, 1, 36).map((index) => (
          <span
            key={index}
            className="skeleton aspect-cinema grid-rows-subgrid rounded-md"
          />
        ))}
      </div>
    </div>
  );
}
