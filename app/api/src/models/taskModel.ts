import mongoose, { InferSchemaType, model } from 'mongoose';

const TaskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Task has not been started',
  },
  timers: {
    type: Number,
    required: true,
    default: 1,
  },
  notes: {
    type: String,
    default: '',
  },
  priority: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

type Task = InferSchemaType<typeof TaskSchema>;

export default model<Task>('Task', TaskSchema);
