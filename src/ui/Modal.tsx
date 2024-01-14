import React, {CSSProperties, useEffect, useRef} from 'react';
import {Icon} from "@tremor/react";
import {XMarkIcon} from "@heroicons/react/20/solid";
import {createPortal} from "react-dom";

type ModalProps = {
    shown: boolean
    close: Function
    children: JSX.Element | string | JSX.Element[]
    className?: string
    zIndex?: number
    widthClass?: string
    modalStyle?: CSSProperties | undefined
}

function Modal({shown, children, close, className, widthClass, zIndex, modalStyle}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);

    function handleClickOutside(event: MouseEvent) {
        event.stopPropagation();
        if (isMounted.current && modalRef.current && !modalRef.current.contains(event.target as Node)) {
            // close();
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        isMounted.current = true;
        return () => {
            document.body.classList.remove("overflow-hidden");
            document.removeEventListener('mouseup', handleClickOutside);
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (shown) {
            document.body.classList.add("overflow-hidden");
        }

        return () => {
            if (isMounted.current) {
                document.body.classList.remove("overflow-hidden");
            }
        };
    }, [shown])

    return createPortal(
        <div
            className="relative z-10"
            style={{
                opacity: shown ? 1 : 0,
                visibility: shown ? 'visible' : 'hidden',
                zIndex: !!zIndex ? zIndex : 9999,
            }}
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto" style={{zIndex: 9999}}>
                <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0" >
                    <div style={modalStyle} className={"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full p-8 modal " + (widthClass ?? "sm:max-w-7xl") + " " + className} onMouseUp={(e) => e.stopPropagation()}  ref={modalRef}>
                        <div className="absolute right-4 top-4 cursor-pointer" onClick={() => {close();}}><Icon icon={XMarkIcon} color="slate"></Icon></div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    , document.body);
}

export default Modal;