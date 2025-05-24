import RemovePage from "./RemovePage"

interface Props {
    params : {id:string}
  }
  const page = ({params:{id}}:Props) => {
    return (
      <RemovePage id={id}/>
    )
  }
  
  export default page