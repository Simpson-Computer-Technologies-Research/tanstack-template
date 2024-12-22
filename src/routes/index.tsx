import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex flex-col justify-center items-center p-12">
      <h1 className="text-4xl font-bold">Welcome</h1>
    </main>
  );
}
