export default function Resolve({ error }: { error: string }) {
  const title = error.replaceAll("-", " ");

  return (
    <div className="px-4">
      <article className="max-w-8xl mx-auto">
        <h1 className="text-xl text-gray-800 dark:text-gray-200">{title}</h1>
      </article>
    </div>
  );
}
