import React from 'react'
import ApprovalCard from '../../ApprovalCard'

interface Props {
    id:number
  }
  const Revoked = ({id}:Props) => {
    return (
        <div className='flex justify-center'>
            <ApprovalCard id={id}/>
        </div>
      
    )
}

export default Revoked
