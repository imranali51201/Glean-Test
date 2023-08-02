'use client';
import React, { useCallback, useRef } from 'react';
import { Button } from '@src/components';
import { CreatorFlowModal, CreatorFlowModalRef } from './components';

export default function HomePage() {
  const addContentModalRef = useRef<CreatorFlowModalRef>(null);

  const handleCreateFlow = useCallback(() => {
    addContentModalRef.current?.openModal();
  }, []);

  return (
    <div className='h-full bg-[url("/images/background-cover.png")] flex justify-center items-center'>
      <Button onClick={handleCreateFlow}>Create Flow</Button>
      <CreatorFlowModal ref={addContentModalRef} />
    </div>
  );
}