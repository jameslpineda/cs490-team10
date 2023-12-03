import { google } from 'googleapis';
import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import { Event } from '../interfaces/eventsInterface';
import { Response } from 'express';
import { oauth2Config } from '../utils/config';
import { createTokensValidation } from '../validations/gcalValidation';
import { getUser, updateUser } from '../services/userService';
import asyncHandler from 'express-async-handler';
import moment from 'moment';

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

// @desc Creates authorization url for OAuth2
// @route GET /gcal/create-auth
// @access Private
export const createAuth = (req: AuthRequest, res: Response) => {
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
  });

  res.status(200).json({
    authUrl: authorizationUrl,
  });
};

// @desc Creates tokens from authorization code
// @route POST /gcal/create-tokens
// @access Private
export const createTokens = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const validation = createTokensValidation(req.body);
    if (validation.error) {
      res.status(422);
      throw new Error(validation.error.details[0].message);
    }
    const { code } = req.body;

    // Exchange tokens for code
    const { tokens } = await oauth2Client.getToken(code);
    if (tokens.refresh_token) {
      // Store refresh token
      const updatedUser = await updateUser(
        { _id: req.user_id },
        { oauth2_refresh_token: tokens.refresh_token },
      );

      // If the update failed
      if (!updatedUser) {
        throw new Error('Failed to update user.');
      }
    }
    res.status(200).json({ message: 'Successfully created tokens' });
  },
);

// @desc Get events using the tokens
// @route GET /gcal/get-events
// @access Private
export const getEvents = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const date = req.query.date;

    if (!date) {
      res.status(422);
      throw new Error('Missing date in query');
    }
    const from = moment(date as string).startOf('day');
    const to = moment(from).add(1, 'day');

    const user = await getUser({ _id: req.user_id });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (!user.oauth2_refresh_token) {
      throw new Error(
        'Authorization is required to connect to Google Calendar',
      );
    }

    oauth2Client.setCredentials({ refresh_token: user.oauth2_refresh_token });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const resp = await calendar.events.list({
      calendarId: 'primary',
      timeMin: from.toISOString(),
      timeMax: to.toISOString(),
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
          : from.toISOString();
        const end = item.end
          ? item.end.dateTime || item.end.date
          : to.toISOString();
        const event = {
          summary: item.summary,
          description: item.description,
          start: start,
          end: end,
        };
        return event as Event;
      });
    }

    res.status(200).json({
      message: 'Successfully retrieved Google Calendar Events',
      events,
    });
  },
);
// export const getEvents = async (req: AuthRequest, res: Response) => {
//   oauth2Client.setCredentials(tokens);

//   const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
//   let userCredential = tokens;

//   oauth2Client.on('tokens', (tokens) => {
//     if (tokens.refresh_token) {
//       // Store refresh token
//       userCredential = tokens;
//     }
//   });

//   const dist = tokens.expiry_date - Date.now(); // distance in milliseconds from the expiry date
//   let timerOne = setInterval(async () => {
//     const resp = await calendar.events.list({
//       calendarId: 'primary',
//       timeMin: '2023-05-01T12:00:00Z',
//       timeMax: '2023-05-01T12:00:01Z', //max time only one second after begin time to make a dummy call
//       maxResults: 100,
//       singleEvents: true,
//       orderBy: 'startTime',
//     });
//   }, dist - 10000); // 10 seconds before expiry, make an API call to refresh the access token - it will automatically update within the oauth client

//   console.log({ tokens });
//   const resp = await calendar.events.list({
//     calendarId: 'primary',
//     timeMin: start,
//     timeMax: end,
//     maxResults: 100,
//     singleEvents: true,
//     orderBy: 'startTime',
//   });

//   const calendarEvents = resp.data.items;
//   if (!calendarEvents || calendarEvents.length === 0) {
//     console.log('No upcoming events found.');
//     return;
//   }

//   console.log('Upcoming 100 events:');
//   const events = calendarEvents.map((item, i) => {
//     const start = item.start.dateTime || item.start.date;
//     const end = item.end.dateTime || item.end.date;
//     const event = {
//       summary: item.summary,
//       description: item.description,
//       start: start,
//       end: end,
//     };
//     return event;
//   });

//   return { code, events };
// };
