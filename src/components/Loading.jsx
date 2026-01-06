export default function Loading({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="text-center">
        <div className="loader mb-2" aria-hidden />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
