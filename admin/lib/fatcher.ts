// 📁 lib/fetcher.ts
import axiosClient from "./axiosClient";

const fetcher = (url: string) =>
  axiosClient.get(url).then((res) => res.data);

export default fetcher;
