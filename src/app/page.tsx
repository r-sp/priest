import { ColorView } from "~/components/ui";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-8 px-4 md:px-0 md:py-4">
      <div className="mx-auto grid w-full max-w-3xl gap-y-4">
        <ColorView />
      </div>
    </div>
  );
}
