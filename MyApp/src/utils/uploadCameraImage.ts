// src/utils/uploadCameraImage.ts
export const uploadCameraImage = async (
  img: {
    uri: string;
    fileName?: string;
    type?: string;
  },
  setUploading?: (v: boolean) => void
) => {
  const data = new FormData();
  data.append("file", {
    uri: img.uri,
    name: img.fileName ?? "image.jpg",
    type: img.type ?? "image/jpeg",
  } as any);

  setUploading?.(true);

  try {
    await fetch("https://example.com/upload", {
      method: "POST",
      body: data,
    });
  } catch (e) {
    console.log("UPLOAD ERROR:", e);
  } finally {
    setUploading?.(false);
  }
};
