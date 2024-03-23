import {TagBase} from "./tag.ts";

export type EntryBase = {
  id: number;
  content: string;
  date: Date;
  tags: TagBase[];
}

export type Entry = EntryBase & {
  meta: {
    loading: boolean;
  }
}


export type CreateEntryResponse = {
  id: number;
  content: string;
  tags: TagBase[];
  date: Date;
};

export type GetEntryResponse = CreateEntryResponse;
export type UpdateEntryResponse = CreateEntryResponse;
