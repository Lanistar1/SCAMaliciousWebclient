import { ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const modalWrapperVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ModalWrapper = ({ isOpen, onClose, children }: ModalWrapperProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalWrapperVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;