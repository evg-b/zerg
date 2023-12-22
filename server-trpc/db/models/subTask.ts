import { Schema, model } from 'mongoose'

export interface ISubTask {
  _id?: string
  // task_id: string
  url: string
  status: 'done' | 'pause' | 'play'
  timeStart: string
  video_current: number // текущее время видео
  video_duration: number // продолжительность видео
  video_percent: number // текущее время видео в %
}

export const SubTaskSchema: Schema = new Schema<ISubTask>({
  url: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  timeStart: {
    type: String,
    required: true
  },
  video_current: {
    type: Number,
    required: true
  },
  video_duration: {
    type: Number,
    required: true
  },
  video_percent: {
    type: Number,
    required: true
  }
})

export default model<ISubTask>('subTask', SubTaskSchema)
