export const base64ToFile = (base64: string, fileName: string) => {
  const byteString = atob(base64.split(",")[1]);
  const mimeType = base64.match(/data:(.*);base64/)![1];

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++)
    uint8Array[i] = byteString.charCodeAt(i);

  return new File([uint8Array], fileName, { type: mimeType });
};
