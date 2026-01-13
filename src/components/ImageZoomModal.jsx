import { useEffect, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

function ImageZoomModal({ isOpen, imageUrl, imageName, onClose }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!isOpen) return;
    setZoom(1);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "+" || e.key === "=") {
        setZoom((prev) => Math.min(prev + 0.2, 3));
      }
      if (e.key === "-" || e.key === "_") {
        setZoom((prev) => Math.max(prev - 0.2, 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 1));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => {
      const next = prev + delta;
      return Math.min(3, Math.max(1, parseFloat(next.toFixed(2))));
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onWheel={handleWheel}
      role="dialog"
      aria-modal="true"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-200 transition-colors z-10"
        title="Close"
      >
        <X size={24} className="text-black" />
      </button>

      {/* Image Container */}
      <div className="relative flex items-center justify-center w-full h-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div
          className="flex items-center justify-center"
          style={{
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <img
            src={imageUrl}
            alt={imageName}
            className="max-w-full max-h-[80vh] object-contain"
            onDoubleClick={handleResetZoom}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 bg-white bg-opacity-95 rounded-full px-4 py-3 shadow-lg">
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={zoom <= 1}
          title="Zoom Out"
        >
          <ZoomOut size={20} className="text-blue-600" />
        </button>

        <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold min-w-[60px] text-center">
          {(zoom * 100).toFixed(0)}%
        </div>

        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={zoom >= 3}
          title="Zoom In"
        >
          <ZoomIn size={20} className="text-blue-600" />
        </button>

        <div className="w-px bg-gray-300"></div>

        <button
          onClick={handleResetZoom}
          className="px-3 py-2 hover:bg-gray-200 rounded-full transition-colors text-sm font-medium text-gray-700"
          title="Reset Zoom"
        >
          Reset
        </button>
      </div>

      {/* Hint Text */}
      <div className="absolute top-6 left-6 text-white text-sm space-y-1">
        <p>Double-click image to reset zoom.</p>
        <p>Use + / - keys or scroll to zoom. Tap outside or press Esc to close.</p>
      </div>
    </div>
  );
}

export default ImageZoomModal;
