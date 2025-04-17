"use client"
import React from 'react'
import { useMovieContext } from '@/context/MovieContext'

const CounterList = () => {
    const { movieList} = useMovieContext()

  return (
    <>
      <p className='leading-none text-neutral-700 dark:text-neutral-300'>{movieList.length}</p>
    </>
  )
}

export default CounterList
