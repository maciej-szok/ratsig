export type EntryBase = {
  id: number;
  content: string;
  date: Date;
}

export type Entry = EntryBase & {
  meta: {
    loading: boolean;
  }
}


export type CreateEntryResponse = {
  id: number;
  content: string;
  tags: Array<object>;
  date: Date;
};

export type GetEntryResponse = CreateEntryResponse;
export type UpdateEntryResponse = CreateEntryResponse;
