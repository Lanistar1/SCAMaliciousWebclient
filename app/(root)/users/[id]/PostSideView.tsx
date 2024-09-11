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

const PostSideView = ({Posts}:Props) => {
    const [isRecent, setIsRecent] =useState()
  return (
    <RecentPost Posts={Posts}/>
  )
}

export default PostSideView
