import { Button, Input } from '@src/components';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

type AddContentFormProps = {
    onClickCreateGlean: VoidFunction
}

function AddContentForm(props: AddContentFormProps) {
    const { onClickCreateGlean } = props;
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);

    const onAddLink = useCallback(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    return (
        <div className='flex flex-col items-center text-center w-full sm:w-[333px]'>
            <h5 className='text-[32px] text-[#ffffff80]'>Add Content</h5>
            <div className='flex mt-[60px] mb-[36px]'>
                <button className='flex flex-col items-center' onClick={onClickCreateGlean}>
                    <Image
                        src="/images/create-glean-icon.png"
                        alt="create-glean-icon"
                        width={124}
                        height={97}
                    />
                    <p className='text-white mb-[10px] mt-[14px]'>Create a Glean</p>
                    <p className='text-[#ffffffb3] font-normal'>Add content, links & descriptive text</p>
                </button>
                <button className='flex flex-col items-center'>
                    <Image
                        src="/images/create-collection-icon.png"
                        alt="create-collection-icon"
                        width={124}
                        height={97}
                    />
                    <p className='text-white mb-[10px] mt-[14px]'>Collection</p>
                    <p className='text-[#ffffffb3] font-normal'>Organise gleans & direct links</p>
                </button>
            </div>
            <div className='w-full relative'>
                <Input
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    placeholder='Add a Link, titel or collection name'
                    prefix={<Image src="/images/link-icon.png" alt="link-icon" height={20} width={20} />}
                />
                <AnimatePresence>
                    {!!link && (
                        <Button
                            loading={loading}
                            onClick={onAddLink}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 100 }}
                            exit={{ opacity: 0 }}
                            className='absolute right-1 top-2 shadow-xl'
                        >
                            Add
                        </Button>
                    )}
                </AnimatePresence>
            </div>
            <p className='mt-[17px]'>
                <span className='text-[#ffffffb3] font-bold'>Powered by Gleans Ai ✨ </span>
                <span className='text-[#ffffffb3] font-normal'>Create content automatically and make changes if needed.</span>
            </p>
        </div>
    );
}

export default AddContentForm;