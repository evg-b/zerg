import { CronJob } from 'cron'

export default class Scheduler {
  Overlord: any = {}
  job = new CronJob('* * * * * *', () => {
    // Ваша функция, которую нужно запустить по расписанию
    console.log('hi', Date)
  })
  getStep() {
    // 1 - достаем из таблицы все steps и сравниваем по времени
    // 2 - если время пришло, то смотрим статус
    // 3 - если еще не обработанно то отдаем в Overlord
    // 4 - если Overlord взял в работу, то меняем статус на work
  }
  jobStart() {
    this.job.start()
  }
  jobStop() {
    this.job.stop()
  }
}
