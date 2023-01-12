import { parentPort, workerData } from 'worker_threads'
import { chromium } from 'playwright'
import { Zerg } from '../Zerg/Zerg'
/*
* id: number
* server: string    // vpn страна
* urlTarget: string // url видео которое смотреть
*
*
*
*
*/

console.log(`Zerg workerData: ${workerData}`)
console.log(`Zerg ${workerData.id} start`)

const Thread = async () => {
  const urlTarget = 'https://www.youtube.com/watch?v=7Ix-o-fCpa0'

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
  console.log('[1] state video:', state)

  await zerg.sleep(1000)

  zerg.playVideo()
  await zerg.sleep(5000)
  console.log('[2] state video:', state)

  await zerg.sleep(1000)

  const Duration = await zerg.getDuration()
  while (true) {
    await zerg.sleep(60 * 1000) // 1 minute
    const CurrentTimeNow = await zerg.getCurrentTime()
    if (Duration === CurrentTimeNow) {
      break
    } else {
      const percentVideo = await zerg.getPercent()

      parentPort?.postMessage(`Zerg threads id:${workerData.id} Percent: ${percentVideo}`)
    }
  }
}

void Thread()
