import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const api = axios.create({ baseURL });

export class APIError extends Error {
  title: string;
  description: string;

  constructor({
    title = "Something went Wrong!",
    description = "Server did not respond. Please try again Later",
  }) {
    super(description);
    this.title = title;
    this.description = description;
  }
}
