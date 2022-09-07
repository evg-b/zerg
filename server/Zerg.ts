import { chromium, Page } from 'playwright'

export class Zerg {
  page: Page

  constructor(page:Page) {
    this.page = page
  }

  /**
   * Получение статуса видео
   * @return string
   */
  async getPlayerState() {
    const mapState = {
      '-1': 'not started', // -1 - воспроизведение видео не началось
      '0': 'end',          //  0 - воспроизведение видео завершено
      '1': 'play',         //  1 - воспроизведение
      '2': 'pause',        //  2 - пауза
      '3': 'buffering',    //  3 - буферизация
      '5': 'in queue',     //  5 - видео находится в очереди
    }

    // @ts-ignore
    const stateVideo: keyof typeof mapState= await this.page.evaluate(() => document.getElementById('movie_player').getPlayerState())
    return mapState[stateVideo]
  }

  /**
   * Сколько прошло времени с начало видео
   * @return int
   */
  getCurrentTime() {
    // @ts-ignore
    return this.page.evaluate(() => document.getElementById('movie_player').getCurrentTime())
  }

  /**
   * Продолжительность видео
   * @return int
   */
  getDuration() {
    // @ts-ignore
    return this.page.evaluate(() => document.getElementById('movie_player').getDuration())
  }

   /**
   * Сколько прошло времени с начало видео в процентах
   * @return int
   */
  async getPercent() {
    const Duration = await this.getDuration()
    const CurrentTime = await this.getCurrentTime()

    return CurrentTime/Duration * 100
  }

  /**
   * @ не безопасно (могут отследить)
   * Запуск видео через метод объекта
   */
  playVideo() {
    // @ts-ignore
    this.page.evaluate(() => document.getElementById('movie_player').playVideo())
  }
  pauseVideo() {
    // @ts-ignore
    this.page.evaluate(() => document.getElementById('movie_player').pauseVideo())
  }

  sleep(time: number) {
    return new Promise(function(resolve) {
      setTimeout(resolve, time)
    });
  }
}




export async function ZergProxy(index: number) {
  console.log(`Zerg ${index} start`)
  // const urlTarget = 'https://www.youtube.com/watch?v=7Ix-o-fCpa0'
  const urlTarget = 'https://surfshark.com/dns-leak-test'
  const browser = await chromium.launch({
    headless: false,
    // headless: true,
    proxy: {
      server: 'https://fi-hel.prod.surfshark.com:443',
      username: 'y8wGddwfQty4J5PHW9XqGy6n',
      password: 'kyxzy972Swkz38nALPLYMDvc'
  }
  })
  const page = await browser.newPage()
  await page.goto(urlTarget)

  const zerg = new Zerg(page)
  const state = await zerg.getPlayerState()
  console.log('state video:',state)
  await zerg.sleep(3000)
  zerg.playVideo()

  const Duration = await zerg.getDuration()
  // TIME
  await zerg.sleep(3000)
  console.log('Duration:',Duration)
  console.log('CurrentTime:',await zerg.getCurrentTime())

  await zerg.sleep(3000)
  console.log('Duration:',Duration)
  console.log('CurrentTime:',await zerg.getCurrentTime())

  await zerg.sleep(3000)
  console.log('Duration:',Duration)
  console.log('CurrentTime:',await zerg.getCurrentTime())

  console.log('Percent:',await zerg.getPercent())

  while(true) {
    await zerg.sleep(60*1000)
    const CurrentTimeNow = await zerg.getCurrentTime()
    if(Duration === CurrentTimeNow) {
      break
    } else {
      console.log('Percent:',await zerg.getPercent())
    }
  }
  return
}
