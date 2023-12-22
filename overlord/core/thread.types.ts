export type WorkerDataType = {
  targetUrl: string
  task_id: string
  subTask_id: string
}

export type MessageInit = {
  type: 'init'
  video_duration: number
}

export type MessageNewCurrentTime = {
  type: 'new_currentTime'
  video_current: number
  video_percent: number
}

export type WorkerMessageType = MessageInit | MessageNewCurrentTime
