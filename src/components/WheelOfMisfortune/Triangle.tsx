import React from 'react';

export type TriangleIconProps = {
    className: string;
    color1?: string;
    color2?: string;
};

export const Triangle: React.FC<TriangleIconProps> = ({ className, color1, color2 }) => {
    return (
        <div className={className}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                enableBackground="new 0 0 512 512"
                version="1.1"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
            >
                <path
                    fill={color2 ?? '#C9CFDE'}
                    d="M505.505 408.198L293.767 56.972c-8.106-13.509-22.515-20.114-37.524-20.114-15.01 0-30.019 6.605-38.126 20.114L6.382 408.198c-8.406 13.81-8.406 30.621-.601 44.43 8.106 14.108 22.515 22.515 38.424 22.515H467.68c16.209 0 30.621-8.406 38.424-22.515 8.105-13.81 7.805-30.621-.599-44.43z"
                />
                <path
                    fill={color1 ?? '#B8BFCC'}
                    d="M256.243 475.142H467.68c16.209 0 30.621-8.406 38.424-22.515 8.106-13.81 7.805-30.621-.599-44.43L293.767 56.972c-8.106-13.509-22.515-20.114-37.524-20.114v438.284z"
                />
            </svg>
        </div>
    );
};
