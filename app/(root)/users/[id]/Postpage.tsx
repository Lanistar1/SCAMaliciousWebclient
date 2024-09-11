import React from 'react'
import Image from 'next/image'
import PostSideView from './PostSideView';
interface Post {
    title: string;
    description: string;
    date: string;
  }
  
  interface UserProfile {
    name: string;
    email: string;
    joinDate: string;
    lastSeen: string;
    contentsCreated: number;
    status: 'Blocked' | 'Active';
    profilePicture: string;
  }
  
  const posts: Post[] = Array(5).fill({
    title: "The company is pivoting to a new market",
    description: "More description goes here and it ca nbe very...",
    date: "4.4.2019, 13:44"
  });

  const userProfile: UserProfile = {
    name: "Drake Regal",
    email: "dregal@gmail.com",
    joinDate: "12th Dec, 2021",
    lastSeen: "12th Dec, 2021 10:00am",
    contentsCreated: 500,
    status: "Blocked",
    profilePicture: "/assets/images/Ellipse 11.png" // Replace with actual path
  };


  interface Props {
    id:number
  }

const page = ({id}: Props) => {
    return (
        <div className="bg-gray-100 min-h-screen  px-12 py-8">
          <div className="bg-white rounded-[10px] shadow-lg w-full mx-auto">
            <div className="flex">
              {/* Left Column - User Profile */}
              <div className="w-1/3 p-8 border-r">
                    <div className="relative flex flex-col space-y-8">
                        {userProfile.status === 'Blocked' ? (
                          <span className="absolute top-0 left-0 bg-[#FF8F6B] text-white text-xs px-2 py-1 rounded-full">
                            Blocked
                          </span>
                        ) :(
                          <span className="absolute top-0 left-0 bg-[#9CC031] text-white text-xs px-2 py-1 rounded-full">
                            Active
                          </span>
                        )  }
                        <Image
                          src={userProfile.profilePicture}
                          alt={userProfile.name}
                          width={200}
                          height={200}
                          className="rounded-full mx-auto"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center mt-4">{userProfile.name} and {id}</h2>
                    <p className="text-gray-600 text-center">{userProfile.email}</p>
                    <p className="text-sm text-gray-500 text-center mt-2">Joined: {userProfile.joinDate}</p>
                    <p className="text-sm text-gray-500 text-center">Last Seen: {userProfile.lastSeen}</p>
                    <p className="text-lg font-semibold text-center mt-4">
                      {userProfile.contentsCreated}
                      <span className="text-sm text-[#A52A2A] block">Contents Created</span>
                    </p>
                    <div className='flex flex-col  items-center'>
                    <button className="w-[250px] h-[60px] bg-[#A52A2A] text-white py-2 rounded-[5px] mt-6">
                      Unblock User
                    </button>
                    <button className="w-[250px] h-[60px] bg-gray-800 text-white py-2 rounded-[5px] mt-4 flex items-center justify-center">
                      
                      Send Message
                    </button>
                  </div>
              </div>
                
    
              {/* Right Column - Recent Posts */}
              <div className="w-2/3 pr-32 pl-20 py-8">
                <PostSideView  Posts={posts}/>
              </div>
            </div>
          </div>
        </div>
      )
}

export default page
