import React from 'react'
import ApprovedPage from './ApprovedPage'


interface Props {
  params : {id:string}
}
const page = ({params:{id}}:Props) => {
  return (
    <ApprovedPage id={id}/>
  )
}

export default page
