import React from 'react'
import Declined from './Declined'


interface Props {
  params : {id:number}
}
const page = ({params:{id}}:Props) => {
  return (
    <Declined id={id}/>
  )
}

export default page
