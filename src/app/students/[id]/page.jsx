import React from 'react'

export default async function page({params}) {

    const {id}= await params
  return (
    <div >
      <h1>  this student page{id} </h1>
    </div>
  )
}
