import React, {CSSProperties} from 'react';

type CardProps = {
    children: JSX.Element | string | JSX.Element[]
    className?: string
    divRef?: React.RefObject<HTMLDivElement> | undefined
    style?: CSSProperties | undefined
}

function Card({children, className, divRef, style}: CardProps) {
    return (
        <div className={"card " + className} ref={divRef} style={style}>
            {children}
        </div>
    );
}

export default Card;