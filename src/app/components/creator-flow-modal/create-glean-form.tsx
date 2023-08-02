import { Button } from '@src/components';
import Image from 'next/image';
import React, { useCallback } from 'react';

export type AddGleanProps = {
    title: string;
    description?: string;
}

type CreateGleanFormProps = {
    onBack: VoidFunction;
    onAddGlean: (props: AddGleanProps) => Promise<void>;
    onEditDescription: VoidFunction;
    onClickCollection: VoidFunction;
}

function CreateGleanForm(props: CreateGleanFormProps) {
    const { onBack, onAddGlean, onClickCollection, onEditDescription } = props;

    const tags = ['Test', 'Detailed', 'Dance', 'Design', 'UX'];

    const handleAdd = useCallback(async () => {
        await onAddGlean({ title: 'hello', description: '' });
    }, [onAddGlean]);

    return (
        <div className='flex flex-col items-center sm:w-[608px] text-center h-full'>
            <div className='purple-gradient rounded-[25px] h-[240px] w-[240px] flex flex-col items-center justify-center gap-[15px]'>
                <Image src="/images/emoji-icon.png" alt="emoji-icon" height={80} width={80} />
                <div className='flex items-center gap-[15px]'>
                    <Image src="/images/image-icon.png" className='h-[20px] w-[15px]' alt="image-icon" height={1} width={30} />
                    <p className='w-[170px] text-[#ffffff80]'>Paste or tap to change into an image or video.</p>
                </div>
            </div>
            <h1 className='text-[32px] text-white mt-[39px] mb-[32px]'>Very very long title or collection name</h1>
            <p onClick={onEditDescription} className='description'>This is where a detailed scraped description would appear in a glean or collection. If it gets too long, it will start to fade out so that editors can think free and edit the text if needed.</p>
            <div className='flex flex-wrap gap-2 justify-center mt-[27px] mb-[50px]'>
                {tags.map(_tag => (
                    <div key={_tag} className='px-[13px] py-[8px] flex items-center gap-3 bg-[#2A2A2A] rounded-[43px]'>
                        <span className='text-white'>{_tag}</span>
                        <button className='font-bold text-cl text-[#00FF85]'>+</button>
                        <div className='border-l-2 h-full border-[#ffffff1a]' />
                        <button className='text-cl text-[#B9B9B9]'>-</button>
                    </div>
                ))}
            </div>
            <button onClick={onClickCollection} className='flex items-center gap-2 text-[#B9B9B9]'>
                <span>Add to collection</span>
                <Image src="/images/collection-icon.png" alt="collection-icon" width={15} height={15} />
            </button>
            <div className='flex w-full justify-center sm:justify-end gap-[15px] mt-[46px]'>
                <Button buttonType='secondary' onClick={onBack}>Back</Button>
                <Button onClick={handleAdd}>Add Glean</Button>
            </div>
        </div>
    );
}

export default CreateGleanForm;