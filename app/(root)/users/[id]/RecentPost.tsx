import React from 'react'
import {Post, Props} from './PostSideView'

interface RecentProps extends Props{
  handleRead:(post: Post) => void
}

const RecentPost = ({Posts, handleRead}:RecentProps) => {
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[18px]  font-[#00000099]">Recent Posts</h3>
                  <a href="#" className="text-[#A52A2A] text-sm">View All</a>
                </div>
                <div className="space-y-4">
                  {Posts.map((post, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-[15px] space-y-2">

                      <div className='flex justify-between'>
                      <h4 className="font-semibold">{post.title}</h4>
                      <button onClick ={()=> handleRead(post)} className="text-[#A52A2A] text-sm">Read</button>
                      </div>
                      <div className='flex justify-between'>
                      <p className="text-sm text-gray-600 mt-1">{post.description.substring(0,80)}...</p>
                      <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                      
                      {/* <div className="flex justify-between items-center mt-2">
                        
                       
                      </div> */}
                    </div>
                  ))}
                </div>

    </div>
  )
}

export default RecentPost
