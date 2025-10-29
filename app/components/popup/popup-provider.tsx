"use client";
import {Subject} from 'rxjs';
import { PopupContext } from "./popup-context";
import { ReactNode, useRef } from 'react';

export const PopupProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const popupSubject = useRef(new Subject<{title: string, content: string}>());

    
    return (
        <PopupContext.Provider value={{popupSubject: popupSubject.current}}>
            {children}
        </PopupContext.Provider>
    )
}