export const headers = {
  pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
  pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
  "Content-Type": "application/json",
};

export const multiFormHeaders = {
  pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
  pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
  "Content-Type": "multipart/form-data",
};
