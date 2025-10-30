"use client";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../button/button";
import { PopupContext } from "./popup-context";
import CloseIcon from '@mui/icons-material/Close';
import { Card } from "../card/card";

const WarningPopUpContainer = styled.div<{visible: boolean}>`
    width: 100vw;
    height: 100vh;
    width: 100dvw;
    height: 100dvh;
    position: fixed;
    top: 0;
    background: rgba(0,0,0,0.2);
    align-items: center;
    justify-content: center;
    pointer-events: none;
    display: ${({visible}) => visible ? 'flex' : 'none'};
    z-index: 100;
    
`
const WarningPopUp = styled.div`
    white-space:pre-wrap;
    pointer-events: auto;
    z-index: 101;
`

export const Popup : React.FC = () => {

    const {popupSubject} = useContext(PopupContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const sub = popupSubject.subscribe((val) => {
            setTitle(val.title);
            setContent(val.content);
            setIsOpen(true);
        })
        return () => { sub.unsubscribe(); }
    }, [])

    return (
        <WarningPopUpContainer visible={isOpen}>
            <WarningPopUp>
                <Card title={title}>
                <div style={{position: 'absolute', top: '10px', right: '10px'}}>
                    <Button small onClick={() => setIsOpen(false)}><CloseIcon fontSize="small" /></Button>
                </div>
                {content}
                </Card>                
            </WarningPopUp>
        </WarningPopUpContainer>
    )
}