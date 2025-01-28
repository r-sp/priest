import { multiply } from "~/lib/utils";

export default function HomePage() {
  return (
    <div>
      <div className="max-w-8xl mx-auto grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {multiply(1, 1, 36).map((index) => (
          <span
            key={index}
            className="aspect-cinema grid-rows-subgrid rounded-md bg-gray-100 dark:bg-gray-900"
          />
        ))}
      </div>
    </div>
  );
}
