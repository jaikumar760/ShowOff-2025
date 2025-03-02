import CreatePost from '@/components/Post/CreatePost'
import MyPost from '@/components/Post/MyPosts'
import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-col  items-center min-h-[80vh]'>
      <CreatePost/>
      <MyPost/>
    </div>
  )
}

export default Page
