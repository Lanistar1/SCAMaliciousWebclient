import React from 'react'
import AwaitingApproval from './AwaitingApproval'


interface Props {
  params : {id:string}
}
const page = ({params:{id}}:Props) => {
  return (
    <AwaitingApproval id={id}/>
  )
}

export default page
