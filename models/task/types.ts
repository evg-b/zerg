type taskStatus = 'done' | 'pause' | 'play'

export type TaskItem = {
  taskId: string
  url: string
  countZergInitial: number
  countZergDone: number
  countZergWork: number
  status: taskStatus
}

export type TaskListRes = Array<TaskItem>

export type TaskCreateReq = {
  url: string
  countZergInitial: number
}

export type TaskEditReq = {
  taskId: string
  url?: string
  countZergInitial?: number
  status?: taskStatus
}
