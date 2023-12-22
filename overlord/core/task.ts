import { IPool } from './pool'
import { ITask } from 'server-trpc/db/models'

export class Task {
  pool: IPool

  constructor({ pool }: { pool: IPool }) {
    this.pool = pool
  }
  start({ _id: task_id, subTasks }: ITask) {
    // TODO: тут добавляем зергов в работу (pool) на основе SubTask

    subTasks.forEach(({ _id: subTask_id, url, status }) => {
      // если subTask еще не сделана то запускает
      // if (status === 'pause') {
      this.pool.addPool(task_id, subTask_id, url)
      // }
    })
    console.log('[CORE][TASK] START id:', task_id)
  }
  stop(id: string) {
    this.pool.stop(id)
    console.log('[CORE][TASK] STOP id:', id)
  }
}
