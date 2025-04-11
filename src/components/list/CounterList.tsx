"use client"
import React from 'react'
import { useMovieContext } from '@/context/MovieContext'

const CounterList = () => {
    const { movieList} = useMovieContext()

  return (
    <>
      <p>{movieList.length}</p>
    </>
  )
}

export default CounterList
