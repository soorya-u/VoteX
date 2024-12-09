export const bas64ToImage = (img: string) => {
  const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
  const byteCharacters = atob(base64Data);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++)
    byteNumbers[i] = byteCharacters.charCodeAt(i);

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: "image/png" });
  return new File([blob], "user-face-registration.png", {
    type: "image/png",
  });
};
