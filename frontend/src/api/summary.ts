import axios from "axios";
import {BASE_API_URL} from "./base.ts";
import {dateToIso} from "../utils/date.ts";

type GenerateSummaryResponse = {
  msg: string
  summary: string
}

type GenerateSummaryRequest = [true, GenerateSummaryResponse] | [false, {detail: string}]

export const generateSummary = async (dateFrom: Date, dateTo: Date): Promise<GenerateSummaryRequest> => {
  try {
    const data = {date_from: dateToIso(dateFrom), date_to: dateToIso(dateTo)}
    const response = await axios.post<GenerateSummaryResponse>(`${BASE_API_URL}/summary`, data);

    return [true, response.data];
  } catch (error) {
    return [false, { detail: "Sth went wrong idc" }];
  }
}
