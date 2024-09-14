'use client'
import React, { useState } from 'react'
import RecentPost from './RecentPost'
import ReadPost from './ReadPost'


export interface Props {
 Posts : posttype[]
}

type posttype = {
    title:string;
    description:string;
    date:string;
}

export interface Post {
    title:string;
    description:string;
    date:string;
}

const PostSideView = ({Posts}:Props) => {
    const [isRecent, setIsRecent] =useState(true)
    const [readPost, setReadPost] = useState<Post>({
        title:"",
        description:"",
        date:""
    })


    const handleRead = (post:Post) => {
        setReadPost(post)
        setIsRecent(false)
    }

    const closeRead = ()=>{
        setIsRecent(true)
    }

  return (
    isRecent ?
    <RecentPost Posts={Posts} handleRead={handleRead}/> :
    <ReadPost  post={readPost} closeRead={closeRead}/>
  )
}

export default PostSideView
