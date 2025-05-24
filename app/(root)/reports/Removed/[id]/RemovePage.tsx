'use client'
import ModalWrapper from "@/app/components/ModalWrapper"
import Reporting from "../../Reporting"
import { useState } from "react";
import ReportBox from "../../ReportBox";


interface Props {
    id:string
  }
  const ActivePage= ({id}:Props) => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [action,setAction]= useState<string>('')

    const OpenModal = (actiontodo:string)=>{
        setAction(actiontodo)
        setIsFilterModalOpen(true)
    }

   
    return (
        <div className='flex justify-center'>
            <Reporting id={id} openModal={OpenModal}/>

            <ModalWrapper isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
             <ReportBox
                onClose={() => setIsFilterModalOpen(false)}
                action={action}
                id={id}
              />
           </ModalWrapper>
        </div>
      
    )
  }

export default ActivePage