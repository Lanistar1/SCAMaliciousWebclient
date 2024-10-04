import Reporting from "../../Reporting"


interface Props {
    id:number
  }
  const ApprovedPage = ({id}:Props) => {
    return (
        <div className='flex justify-center'>
            <Reporting id={id}/>
        </div>
      
    )
  }

export default ApprovedPage