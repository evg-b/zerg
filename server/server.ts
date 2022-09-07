import express from 'express'
// import path from 'path'
import bodyParser from "body-parser"

import * as dbLocal from './db'
import Overlord from './Overlord'
// import { Worker } from 'worker_threads'
const app = express()

const host = '0.0.0.0'
const port = 4444

// let __dirname = path.resolve()


app.use(bodyParser.json());
app.use(express.static('../app/dist'));

//////////// Overlord ////////////////
const overlord = new Overlord()
//////////// Overlord ////////////////

app.get('/', (_,res) => {
  res.sendFile('../app/dist/index.html');
});

////////// zerg //////////
// let zergI = 0
// app.post('/task-start', (req, res) => {
//   // start | stop
//   /*
//   {
//     id: number // id task
//     status: 'start' | 'stop'
//     count: number
//   }
//
//   */
//   const { count = 1 } = req.body
//   const workerScript = path.join(__dirname,'./ZergThread.ts')
//   for(let i = 0; i < count; i++) {
//     const worker = new Worker(workerScript, { workerData: { id: zergI } })
//     zergI++
//     console.log('worker id',worker.threadId)
//     dbLocal.PoolZerg.set(worker.threadId,worker)
//     worker.on('message', (msg) => console.log('worker msg:',msg))
//     worker.on('error', (error) => console.log('worker error:',error))
//     worker.on('exit', () => console.log('worker exit:'))
//   }
//
//   console.log('task-start:', req.body)
// })
// app.post('/zerg-stop', (req, res) => {
//   // start | stop
//   /*
//   {
//     id: number // id task
//     status: 'start' | 'stop'
//   }
//
//   */
//   console.log('task-status:', req.body)
//   console.log('dbLocal.PoolZerg:', dbLocal.PoolZerg.keys())
//   const idZerg = req.body.id
//   const Zerg = dbLocal.PoolZerg.get(idZerg)
//   Zerg.terminate()
// })

////////// task ///////////
// создание таска
app.post('/task', (req, res) => {
  const { count = 0,name,url }: dbLocal.CreateTask = req.body

  overlord.createTask({name,count,url})
  console.log('task:', req.body)
  res.status(200)
})

// получение всех тасок
app.get('/tasks', (_, res) => {
  // Все задачи
  res.json(overlord.Tasks)
})

// изменение таски
app.put('/task', (req, res) => {
  const {
    id,
    count,
    name,
    url,
    status,
    progress
  }: dbLocal.Task = req.body

  overlord.changeTask({id,name,count,url,status,progress})
  console.log('[changeTask] req.body:', req.body)
  res.status(200)
})

// удаление таски
app.delete('/task', (req, res) => {
  const {
    id
  }: dbLocal.Task = req.body

  const statusDelete = overlord.deleteTask(id)
  console.log('[deleteTask] req.body:', req.body)
  if(statusDelete) {
    res.status(200)
  } else {
    res.status(400)
  }
})

app.listen(port, host, () => {
  console.log(`Server listens http://${host}:${port}`)
})