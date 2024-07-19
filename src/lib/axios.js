import axios from "axios";
import {
  multiFormHeaders,
  jsonHeaders,
  pinataGateway,
  uploadFileApi,
  uploadJsonApi,
} from "@/constants/pinata";

export const uploadFile = async (data) => {
  const { data: response } = await axios.post(uploadFileApi, data, {
    headers: multiFormHeaders,
    maxBodyLength: "Infinity",
  });

  return `${pinataGateway}/${response.IpfsHash}`;
};

export const uploadJson = async (data) => {
  const { data: response } = await axios.post(uploadJsonApi, data, {
    headers: jsonHeaders,
  });

  return `${pinataGateway}/${response.IpfsHash}`;
};
