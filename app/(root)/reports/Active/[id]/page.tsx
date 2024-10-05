import ActivePage from "./ActivePage"

interface Props {
    params : {id:string}
  }
  const page = ({params:{id}}:Props) => {
    return (
      <ActivePage id={id}/>
    )
  }
  
  export default page