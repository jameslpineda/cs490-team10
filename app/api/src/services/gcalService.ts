import { google } from 'googleapis';
import { oauth2Config } from '../utils/config';
import { Event } from '../interfaces/gcalInterface';

// Create OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  oauth2Config.client_id,
  oauth2Config.client_secret,
  oauth2Config.redirect_url,
);
const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

export const createAuthUrl = () => {
  try {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
    });
    return authorizationUrl;
  } catch (error) {
    return null;
  }
};

export const getTokens = async (code: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    return null;
  }
};

export const getEventsFromGcal = async (
  refreshToken: string,
  from: string,
  to: string,
) => {
  try {
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const resp = await calendar.events.list({
      calendarId: 'primary',
      timeMin: from,
      timeMax: to,
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const calendarEvents = resp.data.items;

    let events: Event[] = [];
    if (calendarEvents) {
      events = calendarEvents.map((item) => {
        const start = item.start
          ? item.start.dateTime || item.start.date
          : from;
        const end = item.end ? item.end.dateTime || item.end.date : to;
        const event = {
          title: item.summary,
          description: item.description,
          start: start,
          end: end,
        };
        return event as Event;
      });
    }

    return events;
  } catch (error) {
    return null;
  }
};
