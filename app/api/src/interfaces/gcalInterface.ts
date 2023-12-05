export type CreateTokensReqBody = {
  code?: string;
};

export type Event = {
  title: string;
  description?: string;
  start: string;
  end: string;
};
