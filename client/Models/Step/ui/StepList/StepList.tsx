'use client'
import React, { FC } from 'react'
import { API } from '../../model'

import * as Styled from './StepList.styled'

type OwnProps = {
  taskId: string
}

const StepList: FC<OwnProps> = ({ taskId }) => {
  const { data } = API.useGetStepByTaskId(taskId)
  // console.log('StepList data:', taskId)
  // console.log('StepList data:', data)

  return (
    <Styled.Wrapper>
      {data?.map((value, index) => {
        // console.log('step:', value)
        return <div key={index}>1</div>
      })}
    </Styled.Wrapper>
  )
}

export default StepList
