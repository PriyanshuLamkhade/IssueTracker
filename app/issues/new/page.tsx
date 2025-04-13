'use client'
import { Callout, Text, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import {z} from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState:{errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState('')
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text> 
        </Callout.Root>}
      <form className=' space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data)
            router.push('/issues')

          } catch (error) {
            setError('An unexpected error occurred ')
          }
        })}>
        <TextField.Root placeholder="Issue"{...register('title')} />
       <ErrorMessage>{errors.title?.message}</ErrorMessage >  
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
         <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <button className='bg-violet-500 px-2.5 py-1.5 font-medium text-sm  text-white rounded-lg cursor-pointer'>
          Submit New Issue
        </button>
      </form>
    </div>
  )
}

export default NewIssuePage
