'use client'
import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { API } from '../../model'
import { StepList } from '../../../Step/ui'
import { MenuStatusControl, MenuStatusContent } from '../../../../shared/ui'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Pause from '@mui/icons-material/Pause'
import Done from '@mui/icons-material/Done'
import Delete from '@mui/icons-material/Delete'
import * as Styled from './TaskList.styled'

const TaskList = () => {
  const queryClient = useQueryClient()
  const { data } = API.useTaskGetList()
  const { mutateAsync } = API.useTaskEdit(queryClient)
  const { mutateAsync: mutateDelete } = API.useTaskDelete(queryClient)
  // 'done' | 'pause' | 'play'

  return (
    <Styled.Wrapper>
      {data?.map((value, index) => {
        const menuContent: MenuStatusContent = [
          {
            icon: <PlayArrow />,
            value: 'play',
            onClick: () =>
              mutateAsync({ taskId: value.taskId, status: 'play' }),
            confirmTitle: 'confirmTitle play'
          },
          {
            icon: <Pause />,
            value: 'pause',
            onClick: () =>
              mutateAsync({ taskId: value.taskId, status: 'pause' }),
            confirmTitle: 'confirmTitle stop'
          },
          {
            icon: <Delete />,
            value: 'delete',
            onClick: () => mutateDelete(value.taskId),
            confirmTitle: 'confirmTitle delete'
          },
          {
            icon: <Done />,
            value: 'done'
          }
        ]

        return (
          <Styled.ItemList key={index}>
            <Styled.ItemTask>
              <span>{value.taskId}</span>
              <span>{value.url}</span>
              <span>{value.countZergWork}</span>
              <span>
                {value.countZergDone}/{value.countZergInitial}
              </span>
              <span>{value.status}</span>
              <MenuStatusControl
                activeStatus={value.status}
                content={menuContent}
              />
            </Styled.ItemTask>
            <Styled.ItemSteps>
              <StepList taskId={value.taskId} />
            </Styled.ItemSteps>
          </Styled.ItemList>
        )
      })}
    </Styled.Wrapper>
  )
}

export default TaskList
