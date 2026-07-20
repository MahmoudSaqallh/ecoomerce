export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#fffaf3]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-black/10 border-t-black animate-spin" />
        <p className="GolosText text-lg text-gray-600">Loading FashiQue...</p>
      </div>
    </div>
  );
}
