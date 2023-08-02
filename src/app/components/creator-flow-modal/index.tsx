import React, { Ref, forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useResponsive } from '@src/hooks';
import AddContentForm from './add-content-form';
import CreateGleanForm, { AddGleanProps } from './create-glean-form';
import AddCollectionForm from './add-collection-form';
import EditDescriptionForm from './edit-description-form';
import SuccessForm from './success-form';

export type CreatorFlowModalRef = {
  openModal: VoidFunction
}

type StepTypes = 'add-content' | 'create-glean' | 'add-collection' | 'edit-description' | 'success-form'

function CreatorFlowModal({ }, ref: Ref<CreatorFlowModalRef>) {
  const [currentStep, setCurrentStep] = useState<StepTypes>('add-content');
  const isMobile = useResponsive('smallerThan', 'sm');
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setCurrentStep('add-content');
    setOpen(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal: () => setOpen(true)
  }), []);

  const onAddGlean = useCallback(async (props: AddGleanProps) => {
    await fetch('/api/glean', {
      method: 'POST',
      body: JSON.stringify(props)
    });
    setCurrentStep("success-form")
  }, []);

  const allSteps = useMemo(() => ([
    {
      name: 'add-content',
      component: <AddContentForm onClickCreateGlean={() => setCurrentStep('create-glean')} />
    },
    {
      name: 'create-glean',
      component: (
        <CreateGleanForm
          onEditDescription={() => setCurrentStep('edit-description')}
          onClickCollection={() => setCurrentStep('add-collection')}
          onBack={() => setCurrentStep('add-content')}
          onAddGlean={onAddGlean}
        />
      )
    },
    {
      name: 'add-collection',
      component: (
        <AddCollectionForm onSave={() => setCurrentStep('create-glean')} />
      )
    },
    {
      name: 'edit-description',
      component: (
        <EditDescriptionForm
          onBack={() => setCurrentStep('create-glean')}
          onSave={() => setCurrentStep('create-glean')}
        />
      )
    },
    {
      name: 'success-form',
      component: (
        <SuccessForm
          onDone={onClose}
        />
      )
    }
  ]), [onClose, onAddGlean]);

  const modalCardClassName = classNames(
    'bg-[#181818cc] backdrop-blur-[25px] p-[36px] rounded-t-[40px]',
    {
      'w-full shadow-[0px_10px_50px_0px_rgba(0, 0, 0, 0.25)]': isMobile,
      'rounded-b-[40px]': !isMobile
    }
  );

  const modalContainerClassName = classNames(
    'fixed top-0 left-0 w-full h-full bg-[#000000b3] backdrop-blur-[15px] flex justify-center',
    {
      'items-end': isMobile,
      'items-center': !isMobile,
    }
  );

  const renderComponents = useMemo(() => allSteps.map(com => {
    if (com.name !== currentStep) {
      return null;
    };
    return (
      <motion.div
        transition={{ duration: 1 }}
        key={com.name}
        className='h-full'
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        exit={{ opacity: 0 }}
      >
        {com.component}
      </motion.div>
    );
  }), [currentStep, allSteps]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={modalContainerClassName}
        >
          {!((currentStep !== 'add-content') && isMobile) ? (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className={modalCardClassName}
            >
              {renderComponents}
            </motion.div>
          ) : (
            <motion.div
              initial={{ borderTopRightRadius: '40px', borderTopLeftRadius: '40px' }}
              animate={{ height: '100%', borderTopRightRadius: '0px', borderTopLeftRadius: '0px' }}
              exit={{ borderTopRightRadius: '40px', borderTopLeftRadius: '40px' }}
              className={modalCardClassName}
            >
              {renderComponents}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default forwardRef(CreatorFlowModal);