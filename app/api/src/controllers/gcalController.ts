import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import { Response } from 'express';
import { createTokensValidation } from '../validations/gcalValidation';
import { getUser, updateUser } from '../services/userService';
import {
  createAuthUrl,
  getTokens,
  getEventsFromGcal,
  addFocusEventsToGcal,
  // addFocusEventsToGcal,
} from '../services/gcalService';
import asyncHandler from 'express-async-handler';
import moment from 'moment';
import { TaskInterface } from '../interfaces/taskInterface';
import { ObjectId } from 'mongodb';

// @desc Creates authorization url for OAuth2
// @route GET /gcal/create-auth
// @access Private
export const createAuth = (req: AuthRequest, res: Response) => {
  const authorizationUrl = createAuthUrl();

  if (!authorizationUrl) {
    throw new Error('Failed to create authorization url');
  }

  res?.status(200)?.json({
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
    const tokens = await getTokens(code);
    if (!tokens) {
      throw new Error('Failed to exchange code for tokens');
    }

    // Store refresh token
    if (tokens.refresh_token) {
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
      res.status(401);
      throw new Error(
        'Authorization is required to connect to Google Calendar',
      );
    }

    const events = await getEventsFromGcal(
      user.oauth2_refresh_token,
      from.toISOString(),
      to.toISOString(),
    );

    if (events === null) {
      throw new Error('Failed to get events from Google Calendar');
    }

    res.status(200).json({
      message: 'Successfully retrieved Google Calendar Events',
      events,
    });
  },
);

export const addFocusEvents = async (
  focusTasks: TaskInterface[],
  date: moment.Moment,
  user_id: ObjectId,
) => {
  console.log('The tasks are: ' + focusTasks);
  const from = moment(date.format('YYYY-MM-DD') + 'T05:00:00').toDate();
  const to = moment(date.format('YYYY-MM-DD') + 'T20:59:00').toDate();

  const user = await getUser({ _id: user_id });
  if (!user) {
    throw new Error('User not found');
  }
  if (!user.oauth2_refresh_token) {
    throw new Error('Authorization is required to connect to Google Calendar');
  }

  await addFocusEventsToGcal(
    user.oauth2_refresh_token,
    moment(from).toISOString(),
    moment(to).toISOString(),
    focusTasks,
  );
};
