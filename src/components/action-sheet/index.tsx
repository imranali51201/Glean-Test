import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ActionSheetProps = {
  open?: boolean;
  onClose?: VoidFunction;
  children: ReactNode;
}

const ActionSheet = (props: ActionSheetProps) => {
  const { open, onClose, children } = props;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed top-0 left-0 w-full h-full flex items-end justify-center bg-[#000000b3] backdrop-blur-[15px]'
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className='w-full rounded-t-[60px] shadow-[0px_10px_50px_0px_rgba(0, 0, 0, 0.25)] bg-[#181818cc] backdrop-blur-[25px] p-[36px]'
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActionSheet;