import { Task } from './task'
import { Pool } from './pool'

class Overlord {
  pool = new Pool()
  task = new Task({ pool: this.pool })
}

const overlord = new Overlord()

// отчистить zergs в mongoDB

export async function createContext() {
  return {
    Overlord: overlord
  }
}
