import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Error",
  description: "Page Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="px-4">
      <div className="max-w-8xl mx-auto">
        <h1>
          <code>404: Error</code>
        </h1>
        <p>Page Not Found</p>
      </div>
    </div>
  );
}
