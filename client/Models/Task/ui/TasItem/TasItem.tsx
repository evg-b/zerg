'use client'
import React, { FC, useState } from 'react'
import type { MenuProps } from 'antd'
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  PauseOutlined,
  PlayCircleFilled,
  UpOutlined,
  YoutubeOutlined
} from '@ant-design/icons'
import { Dropdown, Button } from 'antd'

import { trpc, RouterOutputs } from 'trpc'

import TaskEditModal from '../TaskEditModal/TaskEditModal'
import SubTaskList from '../../../SubTaskList/SubTaskList'

import * as Styled from './TasItem.styled'

type OwnProps = RouterOutputs['tasks']['getTask']

// <YoutubeOutlined />

const TaskItem: FC<OwnProps> = ({ _id, url, count, status, subTasks }) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [collapseOpen, setCollapseOpen] = useState(false)

  const handleOpenEditModal = () => {
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }
  const { mutate } = trpc.tasks.delete.useMutation()
  const { mutate: statusMutation } = trpc.tasks.statusChange.useMutation()
  // TODO: добавить confirm на каждое джействие
  // 'done' | 'pause' | 'play'
  const items: MenuProps['items'] = [
    {
      label: 'play',
      key: '0',
      icon: <PlayCircleFilled />,
      onClick: () => statusMutation({ id: _id, status: 'play' })
    },
    {
      label: 'pause',
      key: '1',
      icon: <PauseOutlined />,
      onClick: () => statusMutation({ id: _id, status: 'pause' })
    },
    {
      label: 'edit',
      key: '2',
      icon: <EditOutlined />,
      onClick: handleOpenEditModal
    },
    {
      type: 'divider'
    },
    {
      label: 'delete',
      key: '3',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => mutate(_id)
    }
  ]

  const handlerCollapseToggle = () => {
    setCollapseOpen((prev) => !prev)
  }

  return (
    <>
      <Styled.Task>
        <Styled.TaskItem>
          <Button
            type="text"
            icon={collapseOpen ? <UpOutlined /> : <DownOutlined />}
            onClick={handlerCollapseToggle}
          />
          <Styled.InfoText>
            <span>Название видеоdscfdsdscscdscdsfdcdscdscscsdc</span>
            <span>Название каналаdcss</span>
            <Styled.Capture>id: {_id}</Styled.Capture>
          </Styled.InfoText>
          <Button type="link" icon={<YoutubeOutlined />} href={url} danger />
          <Styled.Count>{count}</Styled.Count>
          <span>{status}</span>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        </Styled.TaskItem>
        <SubTaskList open={collapseOpen} subTasks={subTasks} />
      </Styled.Task>
      <TaskEditModal
        id={_id}
        url={url}
        count={count}
        open={openEditModal}
        onClose={handleCloseEditModal}
      />
    </>
  )
}

TaskItem.displayName = 'TaskItem'

export default TaskItem
