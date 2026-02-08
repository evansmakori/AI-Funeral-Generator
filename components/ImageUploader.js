import { useCallback } from "react";

export function ImageUploader({ images, setImages }) {
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const files = [...(e.dataTransfer?.files || [])].filter((f) => f.type.startsWith("image/"));
      if (files.length === 0) return;
      setImages((prev) => [...prev, ...files].slice(0, 5));
    },
    [setImages]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="label">Photos (1–5)</label>
        <span className="text-xs text-slate-500">{images.length}/5</span>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="mt-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6"
      >
        <div className="flex flex-col gap-3">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = [...(e.target.files || [])];
              setImages((prev) => [...prev, ...files].slice(0, 5));
            }}
          />
          <p className="text-sm text-slate-600 leading-relaxed">
            Add a few photos. The layout will choose one primary image and use others as subtle accents.
          </p>
        </div>
      </div>

      {images.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((file, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-800"
            >
              {file.name}
              <button
                type="button"
                className="text-slate-600 hover:text-slate-900"
                onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
              >
                Remove
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
