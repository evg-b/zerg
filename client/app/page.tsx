'use client'
import React, { FC } from 'react'
import { Task } from '../Models'

const Page: FC = () => {
  return (
    <>
      <Task.TaskCreateModal />
      <div>
        <Task.TaskList />
      </div>
    </>
  )
}

export default Page
