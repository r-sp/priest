import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Error",
  description: "Page Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="grid gap-12">
      <div className="flex items-center gap-2">
        <span className="skeleton inline-flex size-12 rounded-md" />
        <span className="skeleton inline-flex h-12 w-full max-w-64 rounded-md" />
      </div>

      <div className="grid max-w-96">
        <div className="inline-grid gap-2">
          <span className="skeleton h-5 max-w-32" />
          <span className="skeleton h-5" />
        </div>
      </div>

      <div className="grid max-w-96 gap-6">
        <div className="inline-grid gap-2">
          <span className="skeleton h-5 max-w-32" />
          <span className="skeleton h-5" />
        </div>
        <div className="inline-grid gap-2">
          <span className="skeleton h-5 max-w-40" />
          <span className="skeleton h-5" />
        </div>
      </div>

      <div className="grid max-w-96 gap-6">
        <div className="inline-grid gap-2">
          <span className="skeleton h-5 max-w-32" />
          <span className="skeleton h-5" />
        </div>
        <div className="inline-grid gap-2">
          <span className="skeleton h-5 max-w-40" />
          <span className="skeleton h-5" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
        <span className="skeleton aspect-cinema grid-rows-subgrid" />
      </div>
    </div>
  );
}
