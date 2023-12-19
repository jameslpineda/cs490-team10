import { google } from 'googleapis';
import { oauth2Config } from '../utils/config';
import { Event } from '../interfaces/gcalInterface';
import moment from 'moment';
import { TaskInterface } from '../interfaces/taskInterface';

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

export const addFocusEventsToGcal = async (
  refreshToken: string,
  from: string,
  to: string,
  focusTasks: TaskInterface[],
) => {
  try {
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const events = await getEventsFromGcal(refreshToken, from, to);
    if (events) {
      const availableSlots = getAvailableSlots(events, from, to);
      for (const focusTask of focusTasks) {
        console.log('\nAdding slot(s) for task: ' + focusTask.name);
        if (focusTask.timers && focusTask.name) {
          for (let j = 0; j < focusTask.timers; j++) {
            const slot = availableSlots.pop();
            if (slot) {
              slot.start = slot.start.replace('+00:00', '-05:00');
              slot.end = slot.end.replace('+00:00', '-05:00');
              const event = {
                summary: focusTask.name,
                start: { dateTime: slot.start },
                end: { dateTime: slot.end },
              };
              console.log(
                'Slot is inserting to time: ' +
                  slot.start +
                  ' until ' +
                  slot.end,
              );
              await calendar.events.insert({
                auth: oauth2Client,
                calendarId: 'primary',
                requestBody: event,
              });
            } else {
              console.log('\nERROR: No slots available\n');
            }
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

function getAvailableSlots(events: Event[], from: string, to: string) {
  const format = 'YYYY-MM-DDTHH:mm:ssZ';
  const startTime = moment(from);
  const endTime = moment(to);
  const slotDuration = 25; // in minutes
  const slots = [];

  while (startTime < endTime) {
    const slotEnd = moment(startTime).add(slotDuration, 'minutes');
    if (slotEnd > endTime) {
      break;
    }

    console.log(
      `\nChecking timeslot start: ${startTime.format(
        'h:mm A',
      )} end: ${slotEnd.format('h:mm A')}`,
    );
    const isConflict = events.some((event) => {
      const eventStart = moment(event.start).subtract(5, 'hours');
      const eventEnd = moment(event.end).subtract(5, 'hours');

      return (
        (startTime.isSameOrAfter(eventStart) && startTime.isBefore(eventEnd)) || // Slot starts within the event
        (slotEnd.isAfter(eventStart) && slotEnd.isSameOrBefore(eventEnd)) || // Slot ends within the event
        (startTime.isSameOrBefore(eventStart) &&
          slotEnd.isSameOrAfter(eventEnd))
      ); // Event is within the slot
    });

    if (!isConflict) {
      slots.push({
        start: startTime.format(format),
        end: slotEnd.format(format),
      });
    } else {
      console.log('Had a conflict');
    }
    startTime.add(slotDuration, 'minutes');
  }

  return slots;
}
