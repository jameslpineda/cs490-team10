export type RootState = {
  auth: {
    user: {
      email: string;
      first_name: string;
      last_name: string;
      pomodoro: number;
      short_break: number;
      long_break: number;
    };
    token: string;
  };
};
