export function SkeletonColor() {
  return (
    <div className="px-4">
      <div className="mx-auto grid max-w-3xl gap-y-8">
        <div className="flex gap-y-4">
          <div className="skeleton aspect-cinema inline-flex w-full rounded-md"></div>
          <div className="skeleton h-7"></div>
        </div>
        <div className="grid gap-y-2">
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
        </div>
      </div>
    </div>
  );
}
