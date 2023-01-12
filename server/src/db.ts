
/*
* Task==========
* id: number
* name: string // name video
* count: number
* url: string
* status: string // start | stop
* progress: string // 0/count
*
*
*/
export interface Task {
  id: number
  name: string
  count: number
  url: string
  status: 'start' | 'stop'
  progress: string
}

export type CreateTask = Pick<Task, 'name' | 'count' | 'url'>

const Task1: Task = {
  id: 0,
  name: 'test video 1',
  count: 10,
  url: 'https://www.youtube.com/watch?v=7Ix-o-fCpa0',
  status: 'stop', // start | stop
  progress: '0'

}
export const Tasks: Task[] = [
  Task1
]

/*
* Profile==========
* server: string // страна
* screen?: { // размеры браузерного окна
*   width: number
*   height: number
* }
* userAgent?: string
*
*
*/
export const Profiles = [
  {
    id: 1,
    server: 'https://fi-hel.prod.surfshark.com:443'
  }
]

export const PoolZerg = new Map()
