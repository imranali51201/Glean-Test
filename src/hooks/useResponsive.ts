import { useEffect, useState } from 'react';

type QueryTypes = 'is' | 'between' | 'greaterThan' | 'smallerThan';
type BreakPointsType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export default function useResponsive(query: QueryTypes, breakpoints: BreakPointsType | [BreakPointsType, BreakPointsType]) {
    const [currentWidth, setCurrentWidth] = useState(window.document.body.clientWidth);

    useEffect(() => {
        window.addEventListener('resize', () => setCurrentWidth(window.document.body.clientWidth));
    }, []);

    const breakpointsSizes = {
        'sm': 640,
        'md': 768,
        'lg': 1024,
        'xl': 1280,
        '2xl': 1536,
    };

    type BreakpointsSizesKey = keyof typeof breakpointsSizes

    const levels = ['sm', 'md', 'lg', 'xl', '2xl'];

    if (typeof breakpoints === 'string') {
        switch (query) {
            case 'is':
                switch (breakpoints) {
                    case 'xs':
                        return currentWidth <= breakpointsSizes.sm;
                    case '2xl':
                        return currentWidth >= breakpointsSizes['2xl'];
                    default:
                        const index = levels.indexOf(breakpoints);
                        return currentWidth >= breakpointsSizes[breakpoints]
                            && currentWidth <= breakpointsSizes[levels[index + 1] as BreakpointsSizesKey];
                }
            case 'smallerThan':
                return currentWidth < breakpointsSizes[breakpoints as BreakpointsSizesKey];
            case 'greaterThan':
                return currentWidth > breakpointsSizes[breakpoints as BreakpointsSizesKey];
            default:
                break;
        }
    } else if (Array.isArray(breakpoints)) {
        const [start, end] = breakpoints;
        if (query === 'between') {
            return (currentWidth >= breakpointsSizes[start as BreakpointsSizesKey])
                && (currentWidth <= breakpointsSizes[end as BreakpointsSizesKey]);
        }
    }

    throw new Error('Invalid input. Please provide a valid query and breakpoint.');
}






