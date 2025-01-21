import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold sm:texl-2xl">404</h2>
        <h2 className="mb-2 text-xl sm:texl-2xl">Not Found</h2>
        <p className="text-medium">Could not find requested page</p>
        <Link className="text-sm hover:text-primary-500" href="/">Return Home</Link>
      </div>
    </main>
  );
}
