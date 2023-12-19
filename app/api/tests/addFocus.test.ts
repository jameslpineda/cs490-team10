import moment from 'moment';
import { addFocusEvents } from '../src/controllers/gcalController';
import { getUser } from '../src/services/userService';
import { addFocusEventsToGcal } from '../src/services/gcalService';
import { TaskInterface } from '../src/interfaces/taskInterface';
import { ObjectId } from 'mongodb';

jest.mock('../src/services/userService', () => ({
  getUser: jest.fn(),
}));

jest.mock('../src/services/gcalService', () => ({
  addFocusEventsToGcal: jest.fn(),
}));

describe('addFocusEvents function', () => {
  it('should add focus events successfully', async () => {
    const focusTasks: TaskInterface[] = [];
    const date = moment();
    const user_id = new ObjectId();

    (getUser as jest.Mock).mockResolvedValue({
      _id: user_id,
      oauth2_refresh_token: 'yourRefreshToken',
    });

    (addFocusEventsToGcal as jest.Mock).mockResolvedValue(undefined);

    await expect(
      addFocusEvents(focusTasks, date, user_id),
    ).resolves.not.toThrow();

    expect(getUser).toHaveBeenCalledWith({ _id: user_id });
    expect(addFocusEventsToGcal).toHaveBeenCalledWith(
      'yourRefreshToken',
      expect.any(String),
      expect.any(String),
      focusTasks,
    );
  });

  it('should throw an error if user is not found', async () => {
    const focusTasks: TaskInterface[] = [];
    const date = moment();
    const user_id = new ObjectId();

    (getUser as jest.Mock).mockResolvedValue(null);

    await expect(addFocusEvents(focusTasks, date, user_id)).rejects.toThrow(
      'User not found',
    );

    expect(getUser).toHaveBeenCalledWith({ _id: user_id });
  });

  it('should throw an error if authorization is required', async () => {
    const focusTasks: TaskInterface[] = [];
    const date = moment();
    const user_id = new ObjectId();

    (getUser as jest.Mock).mockResolvedValue({
      _id: user_id,
      oauth2_refresh_token: null,
    });

    await expect(addFocusEvents(focusTasks, date, user_id)).rejects.toThrow(
      'Authorization is required to connect to Google Calendar',
    );

    expect(getUser).toHaveBeenCalledWith({ _id: user_id });
  });

  it('should handle errors from addFocusEventsToGcal', async () => {
    const focusTasks: TaskInterface[] = [];
    const date = moment();
    const user_id = new ObjectId();

    (getUser as jest.Mock).mockResolvedValue({
      _id: user_id,
      oauth2_refresh_token: 'yourRefreshToken',
    });

    (addFocusEventsToGcal as jest.Mock).mockRejectedValue(
      new Error('GCal error'),
    );

    await expect(addFocusEvents(focusTasks, date, user_id)).rejects.toThrow(
      'GCal error',
    );

    expect(getUser).toHaveBeenCalledWith({ _id: user_id });
    expect(addFocusEventsToGcal).toHaveBeenCalledWith(
      'yourRefreshToken',
      expect.any(String),
      expect.any(String),
      focusTasks,
    );
  });
});
