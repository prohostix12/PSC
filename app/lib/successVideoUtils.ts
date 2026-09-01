export type VideoSourceType = "upload" | "youtube" | "instagram" | "drive";

export type SuccessVideo = {
  _id: string;
  sourceType: VideoSourceType;
  url: string; // data URI for "upload", the original link otherwise
  createdAt: string;
};

// A local video clip stored as a data URI in MongoDB has to stay small —
// there's no dedicated video/blob storage wired up for this project, so
// this only suits short, low-resolution clips.
export const MAX_VIDEO_UPLOAD_BYTES = 4 * 1024 * 1024;

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

function getDriveId(url: string): string | null {
  const m = url.match(/\/d\/([a-zA-Z0-9_-]{10,})/) || url.match(/id=([a-zA-Z0-9_-]{10,})/);
  return m ? m[1] : null;
}

function getInstagramPath(url: string): string | null {
  const m = url.match(/instagram\.com\/(reel|p|tv)\/([a-zA-Z0-9_-]+)/);
  return m ? `${m[1]}/${m[2]}` : null;
}

// Turns whatever link the admin pasted into an embeddable iframe URL.
// Falls back to the raw link (best-effort) if the pattern isn't recognized.
export function toEmbedUrl(video: SuccessVideo): string {
  const { sourceType, url } = video;

  if (sourceType === "youtube") {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }

  if (sourceType === "drive") {
    const id = getDriveId(url);
    return id ? `https://drive.google.com/file/d/${id}/preview` : url;
  }

  if (sourceType === "instagram") {
    const path = getInstagramPath(url);
    return path ? `https://www.instagram.com/${path}/embed` : url;
  }

  return url;
}
