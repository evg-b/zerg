import { ReactNode } from 'react'

export type MenuStatusContent = {
  icon: ReactNode
  value: string
  onClick?: () => Promise<any>
  confirmTitle?: string
}[]

export type MenuStatusControlProps = {
  activeStatus: string
  content: MenuStatusContent
}
