import express from 'express'
import { ZergGo, ZergProxy } from 'server/Zerg/Zerg.ts'
import { loginSurfshark } from './surfshark.ts'

const host = '127.0.0.1'
const port = 7013

const app = express()

for (let index = 0; index < 1; index++) {
  ZergProxy(index)
}
// ZergGo(1)
// loginSurfshark()

// app.get('/zerg', (req, res) => {
//   res.status(200).type('text/plain')
//   res.send('zerg page')

//   for(let i = 0; i < 20; i++) {
//     console.log('go:',i)
//     ZergGo(i)
//   }
// })
// ///////////////////////////
// app.get('/home', (req, res) => {
//   res.status(200).type('text/plain')
//   res.send('Home page')
// })

// app.listen(port, host, function () {
//   console.log(`Server listens http://${host}:${port}`)
// })
