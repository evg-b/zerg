import React, { FC } from 'react'
import * as Styled from './Zerg.styled'

type ZergProps = {
  id: number
  url?: string
  status?: string
  progress?: number
}

const Zerg: FC<ZergProps> = ({ id, status, url, progress }) => {
  return (
    <Styled.ZergWrapper>
      <div>id: {id}</div>
      <div>url: {url}</div>
      <div>status: {status}</div>
      <div>progress: {progress}</div>
    </Styled.ZergWrapper>
  )
}

Zerg.displayName = 'Zerg'

export default Zerg
