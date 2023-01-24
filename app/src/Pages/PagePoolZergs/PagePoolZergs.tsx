import React, { FC } from 'react'
import { PoolZergsAPI } from '../../Models'

const PagePoolZergs: FC = () => {
  const { data, isLoading, error } = PoolZergsAPI.useGetPoolZergs()
  console.log('useGetPoolZergs data:', data)
  console.log('useGetPoolZergs isLoading:', isLoading)
  console.log('useGetPoolZergs error:', error)
  return (
      <div>
        PagePoolZergs
      </div>
  )
}

export default PagePoolZergs
