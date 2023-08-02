import { Button } from '@src/components';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';

type AddCollectionFormProps = {
    onSave: VoidFunction;
}

function AddCollectionForm(props: AddCollectionFormProps) {
    const { onSave } = props;
    const [selectedCollections, setSelectedCollections] = useState<string[]>(['Berlin Essentials', 'Wild Stuff']);

    const collections = [
        'Alternatives',
        'Berlin Essentials',
        'Development',
        'Movies',
        'Series',
        'Wild Stuff',
        'Zapier Hacks'
    ];

    const handleSelectCollection = useCallback((_collection: string, selected: boolean) => () => {
        if (selected) {
            setSelectedCollections(previous => previous.filter(_col => _col !== _collection));
        } else {
            setSelectedCollections(previous => [...previous, _collection]);
        }
    }, []);

    return (
        <div className='flex flex-col justify-between sm:justify-start sm:gap-20 items-center h-full sm:w-[333px]'>
            <h1 className='text-[32px] text-[#ffffff80]'>Collections</h1>
            <div className='flex flex-col gap-5'>
                {collections.map(_collection => {
                    const selected = selectedCollections.includes(_collection);
                    const className = classNames(
                        'px-[15px] py-[10px] rounded-[34px]',
                        {
                            'bg-[#d9d9d91a] text-white': selected,
                            'text-neutral-500': !selected
                        }
                    );
                    return (
                        <button
                            onClick={handleSelectCollection(_collection, selected)}
                            className={className}
                            key={_collection}
                        >
                            {_collection}
                        </button>
                    );
                })}
            </div>
            <div className='flex justify-center sm:justify-end'>
                <Button onClick={onSave}>Save</Button>
            </div>
        </div>
    );
}

export default AddCollectionForm;