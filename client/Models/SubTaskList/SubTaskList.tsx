import React, { FC } from 'react'
import { RouterOutputs } from 'trpc'

import SubTask from '../SubTask/SubTask'

import * as Styled from './SubTaskList.styled'

type OwnProps = {
  open: boolean
  subTasks: RouterOutputs['tasks']['getTask']['subTasks']
}

const SubTaskList: FC<OwnProps> = ({ open, subTasks }) => {
  if (!open) {
    return null
  }
  return (
    <Styled.SubTaskListWrapper>
      {subTasks.map((subTask) => {
        return <SubTask subTask={subTask} />
      })}
    </Styled.SubTaskListWrapper>
  )
}

export default SubTaskList
