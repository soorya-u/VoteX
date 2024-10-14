const pinata_api_key = process.env.PINATA_KEY;
const pinata_secret_api_key = process.env.PINATA_SECRET;

export const jsonHeaders = {
  pinata_api_key,
  pinata_secret_api_key,
  "Content-Type": "application/json",
};

export const multiFormHeaders = {
  pinata_api_key,
  pinata_secret_api_key,
  "Content-Type": "multipart/form-data",
};

export const uploadFileApi = "https://api.pinata.cloud/pinning/pinFileToIPFS";
export const uploadJsonApi = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
export const pinataGateway = "https://gateway.pinata.cloud/ipfs";
