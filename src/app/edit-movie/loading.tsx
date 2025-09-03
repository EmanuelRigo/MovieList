export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">
      <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  );
}
