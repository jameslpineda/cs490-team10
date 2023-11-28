import { apiSlice } from '../../app/api/apiSlice';
import { toast } from 'react-toastify';

type CreateTaskPayload = {
  name: string;
  notes: string;
  status?: string;
  priority: string;
  timers: number;
  date: string;
};
type CreateTaskResponse = {
  message: string;
};

type UpdateTaskPayload = {
  id: string;
  taskPayload: {
    name: string;
    status: string;
    timers: number;
    completed_timers: number;
    notes: string;
    priority: string;
    date: Date | string;
  };
};
type UpdateTaskResponse = {
  message: string;
  updateFields: string[];
};

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (date) => ({
        url: `/task/retrieve?date=${date}`,
        method: 'GET',
      }),
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation<CreateTaskResponse, CreateTaskPayload>({
      query: (payload) => ({
        url: '/task/create',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<UpdateTaskResponse, UpdateTaskPayload>({
      query: ({ id, taskPayload }) => ({
        url: `/user/update/${id}`,
        method: 'POST',
        body: taskPayload,
      }),
      invalidatesTags: ['Tasks'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('DATA: ', data);

          toast.success(`${data.message}!`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          if (err?.error?.data?.message) {
            toast.error(err?.error?.data?.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 7000,
            });
          } else {
            toast.error('An unexpected error has occurred', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 7000,
            });
          }
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = tasksApiSlice;