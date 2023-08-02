import { Button } from '@src/components';
import React from 'react';

type SuccessFormProps = {
    onDone: VoidFunction;
}

function SuccessForm(props: SuccessFormProps) {
    const { onDone } = props;
    return (
        <div className='flex flex-col justify-between items-center sm:w-[333px] h-full sm:h-[600px]'>
            <div />
            <div className='flex w-full justify-center sm:justify-end gap-[15px] mt-[46px]'>
                <Button className='bg-[#00FF85] text-white' onClick={onDone}>Done</Button>
            </div>
        </div>
    );
}

export default SuccessForm;