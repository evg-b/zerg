import { Worker } from 'worker_threads'

type PoolZergItem = {
  id: number
  worker: Worker
  status: string
  rootUrl: string
  url: string
  progress: number
}

type PoolZergType = Map<number, PoolZergItem>

export const PoolZerg: PoolZergType = new Map()
