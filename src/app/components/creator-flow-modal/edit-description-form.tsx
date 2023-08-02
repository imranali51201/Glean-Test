import { Button, Input } from '@src/components';
import React, { useState } from 'react';

type EditDescriptionFormProps = {
    onSave: VoidFunction;
    onBack: VoidFunction;
}

function EditDescriptionForm(props: EditDescriptionFormProps) {
    const { onSave, onBack }=props;
    const [description, setDescription] = useState('This is where a detailed scraped description would appear in a glean or collection. If it gets too long, it will start to fade out so that editors can think free and edit the text if needed.');

    return (
        <div className='flex flex-col justify-between sm:justify-start sm:gap-20 items-center sm:w-[333px] text-center h-full'>
            <div />
            <div className='flex flex-col gap-2 justify-center'>
                <h1 className='text-[32px] text-[#ffffff80]'>Description</h1>
                <p className='text-[#ffffff80]'>Leave the description empty to create a direct link</p>
                <textarea
                    rows={5}
                    className='bg-[#d9d9d91a] rounded-[25px] p-8 text-white text-sm text-justify'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className='flex w-full justify-center sm:justify-end gap-[15px] mt-[46px]'>
                <Button buttonType='secondary' onClick={onBack}>Back</Button>
                <Button onClick={onSave}>Save</Button>
            </div>
        </div>
    );
}

export default EditDescriptionForm;