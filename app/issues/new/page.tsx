'use client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const newIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder="Issue"></TextField.Root>
      <TextArea placeholder="Description" /> 
      <button className='bg-blue-600 px-2.5 py-1.5 font-medium text-sm text-white rounded-sm cursor-pointer'>Submit New Issue</button>
    </div>
  )
}

export default newIssuePage