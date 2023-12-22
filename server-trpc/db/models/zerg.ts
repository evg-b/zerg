import { Schema, model } from 'mongoose'

export interface IZerg {
  _id: string
  url: string
  task_id: string
  zerg_id: number
}

const ZergSchema: Schema = new Schema<IZerg>({
  url: {
    type: String,
    required: true
  },
  task_id: {
    type: String,
    required: true
  },
  zerg_id: {
    type: Number,
    required: true
  }
})

export default model<IZerg>('zerg', ZergSchema)
