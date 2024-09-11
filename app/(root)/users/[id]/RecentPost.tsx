import React from 'react'
import {Props} from './PostSideView'

const RecentPost = ({Posts}:Props) => {
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[18px]  font-[#00000099]">Recent Posts</h3>
                  <a href="#" className="text-[#A52A2A] text-sm">View All</a>
                </div>
                <div className="space-y-4">
                  {Posts.map((post, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold">{post.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{post.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{post.date}</span>
                        <a href="#" className="text-[#A52A2A] text-sm">Read</a>
                      </div>
                    </div>
                  ))}
                </div>

    </div>
  )
}

export default RecentPost
