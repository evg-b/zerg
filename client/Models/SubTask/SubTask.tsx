import React, { FC } from 'react'
import { Progress } from 'antd'
import { ISubTask } from 'server-trpc/db/models'
import { secondsToTime } from '../../utils'

import * as Styled from './SubTask.styled'

type OwnProps = {
  subTask: ISubTask
}

const SubTask: FC<OwnProps> = ({
  subTask: { status, video_current, video_percent, video_duration }
}) => {
  return (
    <Styled.SubTask>
      <span>{status}</span>
      <Styled.Time>
        {secondsToTime(video_current)} / {secondsToTime(video_duration)}
      </Styled.Time>
      <Progress percent={video_percent} status="active" />
    </Styled.SubTask>
  )
}

export default SubTask
