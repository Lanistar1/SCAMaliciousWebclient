import React from 'react'
import Revoked from './Revoked'


interface Props {
  params : {id:string}
}
const page = ({params:{id}}:Props) => {
  return (
    <Revoked id={id}/>
  )
}

export default page
