'use client'
import {TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import React from 'react'
import { useForm , Controller} from "react-hook-form";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css"
import axios from 'axios'
import { useRouter } from 'next/navigation';

interface IssueForm {
  title:string,
  description : string
}


const NewIssuePage = () => {
  const router = useRouter()
  const {register,control,handleSubmit}= useForm<IssueForm>()

  return (
    <form className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async (data)=>{
      await axios.post("/api/issues",data)
      router.push('/issues')
    })}>
      <TextField.Root placeholder="Issue"{...register('title')}/>
      <Controller
      name='description'
      control={control}
      render={({field})=> <SimpleMDE placeholder="Description" {...field}/>}/>
      
      
      <button className='bg-violet-500 px-2.5 py-1.5 font-medium text-sm text-white rounded-lg cursor-pointer'>
        Submit New Issue
      </button>
    </form>
  )
}

export default NewIssuePage
