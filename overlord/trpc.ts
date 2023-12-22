import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { createContext } from './core'

/////////// CONTEXT ///////////
export type Context = inferAsyncReturnType<typeof createContext>
/////////// CONTEXT ///////////

export const t = initTRPC.context<Context>().create()
