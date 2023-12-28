import { Skeleton } from '@mui/material'
import React from 'react'

export const Skeletonmain = () => {
  return (
    <div className='skeletonmain-container'>
      <Skeleton variant="rounded" width={250} height={150}></Skeleton>
      <Skeleton variant="rounded" width={250} height={150}></Skeleton>
      <Skeleton variant="rounded" width={250} height={150}></Skeleton>
    </div> 
  )
}
