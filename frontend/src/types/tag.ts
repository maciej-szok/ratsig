export type TagBase = {
  id: number;
  type: string;
  text: string;
}


export type GetTagsResponse = TagBase[];
export type CreateTagResponse = TagBase;