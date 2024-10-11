import React from 'react'
import Image from 'next/image'
import { Post } from './PostSideView'

interface Props {
  post : Post,
  closeRead: () => void
}



const ReadPost = ({post,closeRead}: Props) => {
  return (
    <div>
      <div className="flex justify-start  mb-6">
      <button onClick={closeRead}><Image src='/assets/icons/chevron-left.png' alt='left' width={24} height={24}/></button>
         <h3 className="text-[18px]  text-[#A52A2A] ">Back to Recent Posts</h3>             
      </div>
      <div className="flex flex-col justify-start mb-6">
      <div className='font-semibold text-[#09192CCC]'>{post.title}</div>
      <p className='block font-[12px] text-[#09192CCC]'> {post.date}</p>
      </div>
      
       <div className='block font-[13px] text-[#09192CCC] '>{post.description}</div>
     
    </div>
  )
}

export default ReadPost
