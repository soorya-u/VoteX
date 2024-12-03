import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const client = axios.create({ baseURL });
