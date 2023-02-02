'use client'
import React, { FC } from 'react'

import { PoolZergsAPI } from '../../Models'
import Zerg from '../../Models/Zerg/ui/Zerg'
// import { Button } from '@mui/material'

const PageZerg: FC = () => {
  const { data, isLoading, error } = PoolZergsAPI.useGetPoolZergs()
  console.log('useGetPoolZergs data:', data)
  console.log('useGetPoolZergs isLoading:', isLoading)
  console.log('useGetPoolZergs error:', error)
  return (
      <div>
        {
          data?.map(({ id, status, url, progress }) => {
            return <Zerg key={id} id={id} status={status} url={url} progress={progress}/>
          })
        }
      </div>
  )
}

export default PageZerg
