import axios from "axios";
import {BASE_API_URL} from "./base.ts";
import {GetTagsResponse} from "../types/tag.ts";

type GetTagsRequest = [true, GetTagsResponse] | [false, {detail: string}]
export const getTags = async (): Promise<GetTagsRequest> => {
  try {
    const response = await axios.get<GetTagsResponse>(`${BASE_API_URL}/tags`);
    return [true, response.data];
  } catch (error) {
    return [false, { detail: "Sth went wrong idc" }];
  }
}
