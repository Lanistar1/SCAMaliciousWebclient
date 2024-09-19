import React from 'react'
import AwaitingApproval from './AwaitingApproval'


interface Props {
  params : {id:number}
}
const page = ({params:{id}}:Props) => {
  return (
    <AwaitingApproval id={id}/>
  )
}

export default page
