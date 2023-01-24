import { Page } from 'playwright'

type MoviePlayer = {
  getPlayerState: () => number
  getCurrentTime: () => number
  getDuration: () => number
  playVideo: () => void // проверять успешность, через getPlayerState должно быть "play"
  pauseVideo: () => void // проверять успешность, через getPlayerState должно быть "pause"
  getVideoUrl: () => string
}

export class Zerg {
  page: Page

  constructor (page: Page) {
    this.page = page
  }

  /**
   * Получение статуса видео
   */
  async getPlayerState (): Promise<string> {
    const mapState: Record<string, string> = {
      '-1': 'not started', // -1 - воспроизведение видео не началось
      0: 'end', //  0 - воспроизведение видео завершено
      1: 'play', //  1 - воспроизведение
      2: 'pause', //  2 - пауза
      3: 'buffering', //  3 - буферизация
      5: 'in queue' //  5 - видео находится в очереди
    }

    const result = await this.page.evaluate(() => {
      const MP: MoviePlayer = document.getElementById('movie_player') as any as MoviePlayer
      return MP.getPlayerState()
    })
    return mapState[result.toString()]
  }

  /**
   * Сколько прошло времени с начало видео
   */
  async getCurrentTime (): Promise<number> {
    const result = await this.page.evaluate(() => {
      const MP: MoviePlayer = document.getElementById('movie_player') as any as MoviePlayer
      return MP.getCurrentTime()
    })
    return result
  }

  /**
   * Продолжительность видео
   */
  async getDuration (): Promise<number> {
    const result = await this.page.evaluate(() => {
      const MP: MoviePlayer = document.getElementById('movie_player') as any as MoviePlayer
      return MP.getDuration()
    })
    return result
  }

  /**
   * Сколько прошло времени с начало видео в процентах
   */
  async getPercent (): Promise<number> {
    const Duration = await this.getDuration()
    const CurrentTime = await this.getCurrentTime()

    return CurrentTime / Duration * 100
  }

  /**
   * @ не безопасно (могут отследить)
   * Запуск видео через метод объекта
   */
  playVideo () {
    // TODO: FIX сделать возврат результата выполнения функции
    this.page.evaluate(() => {
      const MP: MoviePlayer = document.getElementById('movie_player') as any as MoviePlayer
      return MP.playVideo()
    })
  }

  pauseVideo () {
    // TODO: FIX сделать возврат результата выполнения функции
    this.page.evaluate(() => {
      const MP: MoviePlayer = document.getElementById('movie_player') as any as MoviePlayer
      return MP.pauseVideo()
    })
  }

  async sleep (time: number) {
    return await new Promise(function (resolve) {
      setTimeout(resolve, time)
    })
  }
}
