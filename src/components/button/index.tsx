import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import classnames from 'classnames';

type ButtonProps = {
    buttonType?: 'primary' | 'secondary';
} & HTMLMotionProps<'button'>;

function Button(props: ButtonProps) {
    const { className, buttonType = 'primary', ...restProps } = props;

    const isPrimary = buttonType === 'primary';
    const isSecondary = buttonType === 'secondary';

    const btnClassnames = classnames(
        'px-[17px] py-[13px] text-[16px] rounded-[43px]',
        {
            'bg-[#D9D9D9] text-[#000]': isPrimary,
            'bg-[#2A2A2A] text-[#626262]': isSecondary,
        },
        className
    );

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.99 }}
            className={btnClassnames}
            {...restProps}
        />
    );
}

export default Button;