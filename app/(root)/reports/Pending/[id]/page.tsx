import PendingPage from "./PendingPage"

interface Props {
    params : {id:number}
  }
  const page = ({params:{id}}:Props) => {
    return (
      <PendingPage id={id}/>
    )
  }
  
  export default page