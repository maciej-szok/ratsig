export type GetAuthResponse = {
  access_token: string;
  token_type: string
};

export type BadGetAuthResponse = {
  detail: string;
}

export type Auth = {
  token: string;
  type?: string
};