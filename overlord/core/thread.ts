import {
  parentPort,
  // threadId,
  workerData
  // threadId
} from 'worker_threads'
import { initBrowser } from './browser'
import { Zerg } from './zerg'
import type { WorkerDataType, WorkerMessageType } from './thread.types'

const WorkerData: WorkerDataType = workerData
console.log(`[ZERG] workerData: ${workerData}`)

const Thread = async () => {
  const { targetUrl } = WorkerData
  const urlTarget = targetUrl

  const browser = await initBrowser()

  const page = await browser.newPage()
  await page.goto(urlTarget)

  const zerg = new Zerg(page)

  await zerg.sleep(3000) // 3 sec

  const DurationVideo = await zerg.getDuration()

  const message: WorkerMessageType = {
    type: 'init',
    video_duration: DurationVideo
  }
  parentPort.postMessage(message)

  const state = await zerg.getPlayerState()
  console.log(`[zerg][1] state video:`, state)
  await zerg.playVideo()
  await zerg.sleep(1000) // 1 sec
  console.log(`[zerg][2] playVideo:`, state)

  // хапускаем просмотр
  let watch = true
  while (watch) {
    await zerg.sleep(5000) // 5 sec
    // Получаем время видео
    const CurrentTimeNow = await zerg.getCurrentTime()
    const PercentTimeNow = await zerg.getPercent()

    // обновляем данные о видео
    const message: WorkerMessageType = {
      type: 'new_currentTime',
      video_current: CurrentTimeNow,
      video_percent: PercentTimeNow
    }
    parentPort.postMessage(message)

    if (CurrentTimeNow === DurationVideo) {
      console.log('watch = false', CurrentTimeNow === DurationVideo)
      console.log('CurrentTimeNow:', CurrentTimeNow)
      console.log('DurationVideo:', DurationVideo)
      watch = false
    }
  }
  console.log('THE END')
  process.exit(0)
}

void Thread()
