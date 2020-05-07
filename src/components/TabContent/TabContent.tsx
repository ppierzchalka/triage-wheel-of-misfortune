import React from 'react';

export type TabContentProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const TabContent: React.FC<TabContentProps> = ({ children, index, value }) => {
    return index === value
        ? <div> {children}</div> : null;
}
