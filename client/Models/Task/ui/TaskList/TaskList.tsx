'use client'
import React from 'react'
import { trpc } from 'trpc'

import TasItem from '../TasItem/TasItem'

import * as Styled from './TaskList.styled'

const TaskList = () => {
  const { data } = trpc.tasks.getTaskList.useQuery(undefined, {
    refetchInterval: 5000
  })
  return (
    <Styled.Wrapper>
      {data?.map((task, index) => {
        return <TasItem key={index} {...task} />
      })}
    </Styled.Wrapper>
  )
}

export default TaskList
