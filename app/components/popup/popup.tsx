"use client";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../button/button";
import { PopupContext } from "./popup-context";
import CloseIcon from '@mui/icons-material/Close';

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
    width: fit-content;
    background: white;
    padding: 12px;
    border-radius: 10px;
    white-space:pre-wrap;
    pointer-events: auto;
    z-index: 101;
`
const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px black;
`

export const Popup : React.FC = () => {

    const {popupSubject} = useContext(PopupContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        popupSubject.subscribe((val) => {
            console.log('works?')
            setTitle(val.title);
            setContent(val.content);
            setIsOpen(true);
        })
    }, [])

    return (
        <WarningPopUpContainer visible={isOpen}>
            <WarningPopUp>
                <Header>
                    <h3>{title}</h3>
                    <Button small onClick={() => setIsOpen(false)}><CloseIcon fontSize="small" /></Button>
                </Header>
                {content}
            </WarningPopUp>
        </WarningPopUpContainer>
    )
}