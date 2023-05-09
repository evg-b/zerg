import { CronJob } from 'cron'
import * as dbLocal from './db'

export default class Scheduler {
  Overlord: any = {}
  job = new CronJob('*/5 * * * * *', () => {
    const now = new Date()
    const time = now.toLocaleString()
    const data = `Текущее время: ${time}\n`
    console.log(data)
    console.log(dbLocal.PoolStep.getAllStep())
  })
  getStep() {
    // 1 - достаем из таблицы все steps и сравниваем по времени
    // 2 - если время пришло, то смотрим статус
    // 3 - если еще не обработанно то отдаем в Overlord
    // 4 - если Overlord взял в работу, то меняем статус на work
  }
  jobStart() {
    console.log('[Scheduler] jobStart')
    this.job.start()
  }
  jobStop() {
    this.job.stop()
  }
}
