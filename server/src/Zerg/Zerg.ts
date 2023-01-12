import { Page } from 'playwright'

export class Zerg {
  page: Page

  constructor (page: Page) {
    this.page = page
  }

  /**
   * Получение статуса видео
   * @return string
   */
  async getPlayerState () {
    const mapState = {
      '-1': 'not started', // -1 - воспроизведение видео не началось
      0: 'end', //  0 - воспроизведение видео завершено
      1: 'play', //  1 - воспроизведение
      2: 'pause', //  2 - пауза
      3: 'buffering', //  3 - буферизация
      5: 'in queue' //  5 - видео находится в очереди
    }

    // TODO: fix
    // const stateVideo: keyof typeof mapState = await this.page.evaluate(() => document.getElementById('movie_player')?.getPlayerState())
    // return mapState[stateVideo]
    return mapState[0]
  }

  /**
   * Сколько прошло времени с начало видео
   * @return int
   */
  async getCurrentTime () {
    // TODO: fix
    // return this.page.evaluate(() => document.getElementById('movie_player')?.getCurrentTime())
    return 0
  }

  /**
   * Продолжительность видео
   * @return int
   */
  async getDuration () {
    // TODO: fix
    // return this.page.evaluate(() => document.getElementById('movie_player')?.getDuration())
    return 0
  }

  /**
   * Сколько прошло времени с начало видео в процентах
   * @return int
   */
  async getPercent () {
    const Duration = await this.getDuration()
    const CurrentTime = await this.getCurrentTime()

    return CurrentTime / Duration * 100
  }

  /**
   * @ не безопасно (могут отследить)
   * Запуск видео через метод объекта
   */
  playVideo () {
    // TODO: fix
    // this.page.evaluate(() => document.getElementById('movie_player')?.playVideo())
    return 0
  }

  pauseVideo () {
    // TODO: fix
    // this.page.evaluate(() => document.getElementById('movie_player')?.pauseVideo())
    return 0
  }

  async sleep (time: number) {
    return await new Promise(function (resolve) {
      setTimeout(resolve, time)
    })
  }
}
