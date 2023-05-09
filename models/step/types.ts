export type StepItem = {
  stepId: string
  taskId: string
  timeStart: string
  countZergInitial: number
  countZergDone: number
  countZergWork: number
  status: 'wait' | 'progress' | 'done'
}

export type StepListRes = Array<StepItem>
