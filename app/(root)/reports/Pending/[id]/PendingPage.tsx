import Reporting from "../../Reporting"


interface Props {
    id:number
  }
  const PendingPage= ({id}:Props) => {
    return (
        <div className='flex justify-center'>
            <Reporting id={id}/>
        </div>
      
    )
  }

export default PendingPage