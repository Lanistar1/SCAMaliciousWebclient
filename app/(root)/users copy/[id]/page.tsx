import React from 'react'
import Postpage from './Postpage'


interface Props {
  params : {id:number}
}
const page = ({params:{id}}:Props) => {
  return (
    <Postpage id={id}/>
  )
}

export default page
