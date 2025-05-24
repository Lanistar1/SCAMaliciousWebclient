"use client";
import ModalWrapper from "@/app/components/ModalWrapper";
import ContentDetailPage from "../../ContentDetailPage";
import { useState } from "react";
import ContentBox from "../../ContentBox";

interface Props {
  id: string;
}
const Declined = ({ id }: Props) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [action, setAction] = useState<string>("");

  const OpenModal = (actiontodo: string) => {
    setAction(actiontodo);
    setIsFilterModalOpen(true);
  };

  return (
    <div className="flex justify-center">
      <ContentDetailPage id={id} openModal={OpenModal} />

      <ModalWrapper
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      >
        <ContentBox
          onClose={() => setIsFilterModalOpen(false)}
          action={action}
          id={id}
        />
      </ModalWrapper>
    </div>
  );
};

export default Declined;
