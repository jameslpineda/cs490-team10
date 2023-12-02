import { google } from 'googleapis';
import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import { Response } from 'express';
import { oauth2Config } from '../utils/config';
import { createTokensValidation } from '../validations/gcalValidation';
import asyncHandler from 'express-async-handler';

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
    res.status(200).json({ tokens });
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
