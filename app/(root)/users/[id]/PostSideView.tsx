'use client'
import React, { useState } from 'react'
import RecentPost from './RecentPost'


export interface Props {
 Posts : posttype[]
}

type posttype = {
    title:string;
    description:string;
    date:string;
}

interface Post {
    itle:string;
    description:string;
    date:string;
}

const PostSideView = ({Posts}:Props) => {
    const [isRecent, setIsRecent] =useState(true)
    const [readPost, setReadPost] = useState<Post>()


    const handleRead = (post:Post) => {
        setReadPost(post)
        setIsRecent(false)
    }

    const closeRead = ()=>{
        setIsRecent(true)
    }

  return (
    <RecentPost Posts={Posts}/>
  )
}

export default PostSideView
