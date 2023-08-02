import classNames from 'classnames';
import React, { InputHTMLAttributes, ReactNode } from 'react';

type InputProps = {
    prefix?: ReactNode
    suffix?: ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'>

function Input(props: InputProps) {
    const { prefix, suffix, className, ...restProps } = props;

    const inputClassnames = classNames(
        'px-[15px] py-[20px] bg-[#d9d9d91a] text-white rounded-[25px] flex items-center gap-2',
        className
    );

    return (
        <div className={inputClassnames}>
            {prefix}
            <input className='bg-transparent outline-none flex-1' {...restProps} />
            {suffix}
        </div>
    );
}

export default Input;