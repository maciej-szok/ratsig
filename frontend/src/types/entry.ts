export type CreateEntryResponse = {
  id: number;
  content: string;
  tags: Array<object>;
  date: Date;
};

export type GetEntryResponse = CreateEntryResponse;
export type UpdateEntryResponse = CreateEntryResponse;
