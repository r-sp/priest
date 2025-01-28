import type { ReactNode } from "react";
import { ColorPicker } from "~/components/ui";

export default function CoreLayout({
  children,
  toolbar,
}: {
  children: ReactNode;
  toolbar: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-8 px-4">
      <ColorPicker>
        <div className="grid">
          <div className="inline-grid">{toolbar}</div>
        </div>
      </ColorPicker>
      {children}
    </div>
  );
}
