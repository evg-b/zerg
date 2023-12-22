import { parentPort, workerData, threadId } from 'worker_threads'
import { chromium } from 'playwright'
import { Zerg } from './Zerg'
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
console.log(`Zerg ${workerData.targetUrl} start`)

type MessageThread = {
  id: number
  status: string
  url?: string
  progress?: number
}

type MessageCommand = {
  codeCommand: 'play' | 'pause'
}

const Thread = async () => {
  const urlTarget = 'https://www.youtube.com/watch?v=7Ix-o-fCpa0'

  const browser = await chromium.launch({
    // headless: false,
    headless: true,
    proxy: {
      server: 'https://fi-hel.prod.surfshark.com:443',
      username: 'y8wGddwfQty4J5PHW9XqGy6n',
      password: 'kyxzy972Swkz38nALPLYMDvc'
    }
  })

  const page = await browser.newPage()
  await page.goto(urlTarget)

  const zerg = new Zerg(page)

  parentPort?.on('message', (msg: MessageCommand) => {
    if (msg.codeCommand === 'play') {
      zerg.playVideo().finally(() => {
        const message: MessageThread = {
          id: threadId,
          status: state
        }
        parentPort?.postMessage(message)
      })
    }
    if (msg.codeCommand === 'pause') {
      zerg.pauseVideo().finally(() => {
        const message: MessageThread = {
          id: threadId,
          status: state
        }
        parentPort?.postMessage(message)
      })
    }
    console.log(`[Zerg][id]:${threadId} msg: ${msg.codeCommand}`)
  })

  const state = await zerg.getPlayerState()
  console.log('[1] state video:', state)

  await zerg.sleep(1000)

  await zerg.playVideo()
  console.log('[2] playVideo:', state)
  await zerg.sleep(5000)
  console.log('[3] state video:', state)

  await zerg.sleep(1000)

  const Duration = await zerg.getDuration()
  console.log('[4] Duration video:', Duration)

  while (true) {
    // TODO: Слишком частое обращение к объекту movie_player
    // Могут ли отследить это?

    await zerg.sleep(10 * 1000) // 1 minute

    const state = await zerg.getPlayerState()
    console.log('[5] state video:', state)

    const videoUrl = await zerg.getVideoUrl()

    const CurrentTimeNow = await zerg.getCurrentTime()

    if (Duration === CurrentTimeNow) {
      break
    } else {
      const percentVideo = await zerg.getPercent()
      const message: MessageThread = {
        id: threadId,
        status: state,
        url: videoUrl,
        progress: percentVideo
      }
      parentPort?.postMessage(message)
    }
  }
}

void Thread()
