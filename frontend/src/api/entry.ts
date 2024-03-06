import axios from "axios";
import {BASE_API_URL} from "./base.ts";
import {CreateEntryResponse, GetEntryResponse, UpdateEntryResponse} from "../types/entry.ts";
import {dateToIso} from "../utils/date.ts";

type GetEntryRequest = [true, GetEntryResponse] | [false, {detail: string}]
export const getEntry = async (date: Date): Promise<GetEntryRequest> => {
  try {
    const isoDate = dateToIso(date)

    const response = await axios.get<GetEntryResponse>(`${BASE_API_URL}/entries/${isoDate}`);
    return [true, response.data];
  } catch (error) {
    return [false, { detail: "Entry does not exist" }];
  }
}


type CreateEntryRequest = [true, CreateEntryResponse] | [false, {detail: string}];
export const createEntry = async (date: Date, content: string): Promise<CreateEntryRequest> => {
  try {
    const isoDate = dateToIso(date)

    const response = await axios.post<CreateEntryResponse>(`${BASE_API_URL}/entries/${isoDate}`, {content});
    return [true, response.data];
  } catch (error) {
    return [false, { detail: "Entry does not exist" }];
  }
}

type UpdateEntryRequest = [true, UpdateEntryResponse] | [false, {detail: string}];
export const updateEntry = async (date: Date, content: string): Promise<UpdateEntryRequest> => {
  try {
    const isoDate = dateToIso(date)

    const response = await axios.put<UpdateEntryResponse>(`${BASE_API_URL}/entries/${isoDate}`, {content});
    return [true, response.data];
  } catch (error) {
    return [false, { detail: "Entry does not exist" }];
  }
}