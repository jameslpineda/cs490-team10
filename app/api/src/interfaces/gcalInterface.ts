export type CreateTokensReqBody = {
  code?: string;
};

export type Event = {
  summary: string;
  description?: string;
  start: string;
  end: string;
};
