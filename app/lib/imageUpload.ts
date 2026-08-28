// Shared client-side image upload helper used by the admin Add/Edit
// modals that store a photo as a data URI (Reviews, Events).

// Reject absurdly large picks outright (before we even try to decode
// them), but the real size control is the resize below — a phone photo is
// routinely 3-10MB, so a raw-file cap alone would reject most real photos.
export const MAX_RAW_IMAGE_BYTES = 10 * 1024 * 1024;

// Downscale + re-encode as JPEG so the stored data URI stays small (these
// images are only ever shown as small thumbnails/avatars) and comfortably
// under Vercel's serverless request body limit.
export function compressImageToDataUrl(
  file: File,
  maxDimension = 400,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const width = Math.round(img.width * scale) || 1;
      const height = Math.round(img.height * scale) || 1;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Couldn't process that image"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Couldn't read that file"));
    };

    img.src = objectUrl;
  });
}
