import PendingPage from "./PendingPage"

interface Props {
    params : {id:string}
  }
  const page = ({params:{id}}:Props) => {
    return (
      <PendingPage id={id}/>
    )
  }
  
  export default page