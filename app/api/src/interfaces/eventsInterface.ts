export type GetEventsReqBody = {
  start?: string;
  end?: string;
  code?: string;
};

export type Event = {
  summary: string;
  description?: string;
  start: string;
  end: string;
};

export type Events = {
  code: string;
  events: Event[];
};
