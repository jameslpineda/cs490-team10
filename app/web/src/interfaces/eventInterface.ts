export type Event = {
  title: string;
  description?: string;
  start: globalThis.Date;
  end: globalThis.Date;
};

export type GoogleCalendarEvent = {
  title: string;
  description?: string;
  start: string;
  end: string;
};
