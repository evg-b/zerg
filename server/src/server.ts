import express from 'express'
// import path from 'path'
import bodyParser from 'body-parser'

// import { ZergCreateRequest } from '@models'

// import * as dbLocal from './db'
import Overlord from './Overlord/Overlord'
// import { Worker } from 'worker_threads'
const app = express()

const host = '0.0.0.0'
const port = 4444

// const __dirname = path.resolve()
// const workerScript = path.join(__dirname, './ZergThread.ts')

app.use(bodyParser.json())
app.use(express.static('../app/dist'))

/// ///////// Overlord ////////////////
const overlord = new Overlord()
/// ///////// Overlord ////////////////

app.get('/', (_, res) => {
  res.sendFile('../app/dist/index.html')
})

/// /////// zerg //////////
app.post('/api/zerg/create', (req, res) => {
  const { targetUrl }: any = req.body
  console.log('targetUrl', targetUrl)

  // TODO: выдать зерга должен Overlord
  // const { id, error } = Overlord.zergCreate(targetUrl)
  overlord.zergCreate(targetUrl)
  res.send('Create zerg')
})
overlord.zergCreate('')
app.post('/api/zerg/stop', (req, res) => {
  const { id }: any = req.body

  const result = overlord.zergStop(id)
  console.log('\'/zerg/stop\' result', result)
  res.send(result)
})

app.get('/api/zerg/pool', (_, res) => {
  const poolInfo = overlord.getPool()
  console.log('poolInfo:', poolInfo)
  res.send(poolInfo)
})

app.listen(port, host, () => {
  console.log(`Server listens http://${host}:${port}`)
})
