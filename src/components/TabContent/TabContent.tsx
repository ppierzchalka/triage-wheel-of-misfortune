import React from 'react';

export type TabContentProps<T> = {
    children?: React.ReactNode;
    index: T;
    value: T;
};

export const TabContent = <T,>({ children, index, value }: TabContentProps<T>) => {
    return index === value ? <div className={'drawer__tab-content'}>{children}</div> : null;
};
