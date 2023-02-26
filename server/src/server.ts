import express from 'express'
import bodyParser from 'body-parser'
// import { ZergCreateRequest } from '@models'
import Overlord from './Overlord/Overlord'

import Scheduler from './scheduler'
// import { Worker } from 'worker_threads'
const app = express()

const host = '0.0.0.0'
const port = 4444

app.use(bodyParser.json())
app.use(express.static('../app/dist'))

/// ///////// Overlord ////////////////
const overlord = new Overlord()
overlord.zergCreate('')
/// ///////// Overlord ////////////////

app.get('/', (_, res) => {
  res.sendFile('../app/dist/index.html')
})

/////////////////////////////////////////// TAGRET ZERG ////////////////////////////////////////////////////////////////
app.get('/api/zerg/pool', (_, res) => {
  const poolInfo = overlord.getPoolZerg()
  console.log('poolInfo:', poolInfo)
  res.send(poolInfo)
})
app.post('/api/zerg/create', (req, res) => {
  const { targetUrl }: any = req.body
  console.log('targetUrl', targetUrl)

  // TODO: выдать зерга должен Overlord
  // const { id, error } = Overlord.zergCreate(targetUrl)
  overlord.zergCreate(targetUrl)
  res.send('Create zerg')
})
app.post('/api/zerg/stop', (req, res) => {
  const { id }: any = req.body

  const result = overlord.zergStop(id)
  console.log("'/zerg/stop' result", result)
  res.send(result)
})

app.post('/api/zerg/pause', (req, res) => {
  const { id }: any = req.body

  const result = overlord.zergPause(id)
  console.log("'/zerg/pause' result", result)
  res.send(result)
})

app.post('/api/zerg/play', (req, res) => {
  const { id }: any = req.body

  const result = overlord.zergPlay(id)
  console.log("'/zerg/play' result", result)
  res.send(result)
})
/////////////////////////////////////////// TARGET ZERG ////////////////////////////////////////////////////////////////
/////////////////////////////////////////// MASS ZERG ////////////////////////////////////////////////////////////////

/////////////////////////////////////////// MASS ZERG ////////////////////////////////////////////////////////////////
/////////////////////////////////////////// TASK ////////////////////////////////////////////////////////////////
app.get('/api/task/pool', (_, res) => {
  const poolInfo = overlord.getPollTask()
  console.log('poolTaskInfo:', poolInfo)
  res.send(poolInfo)
})
app.post('/api/task/create', (req, res) => {
  const { url, countZergInitial }: any = req.body

  const resultCreateTask = overlord.createTask({ url, countZergInitial })

  res.send(resultCreateTask)
})
app.post('/api/task/edit', (req, res) => {
  const editTaskValue: any = req.body

  const resultEditTask = overlord.editTask(editTaskValue)

  res.send(resultEditTask)
})
app.post('/api/task/delete', (req, res) => {
  const { id }: any = req.body

  const resultDeleteTask = overlord.deleteTask(id)

  res.send(resultDeleteTask)
})
/////////////////////////////////////////// TASK ////////////////////////////////////////////////////////////////
app.listen(port, host, () => {
  console.log(`Server listens http://${host}:${port}`)
})
