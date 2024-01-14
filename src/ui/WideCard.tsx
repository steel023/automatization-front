import React from 'react';

type WideCardProps = {
    children: JSX.Element | string | JSX.Element[]
    className?: string
}

function WideCard({children, className}: WideCardProps) {
    return (
        <div className={"wide-card " + className}>
            {children}
        </div>
    );
}

export default WideCard;