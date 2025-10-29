"use client";
import React, { useContext } from "react";
import { Button } from "../button/button";
import { UserAgreementContext } from "./user-agreement-context";
import { PopupContext } from "../popup/popup-context";
import { useTranslation } from "@/app/utilities/useTranslation";
import styled from "@emotion/styled";

const Container = styled.div`
height: 45px;
position: fixed;
width: 100%;
bottom: 20px;
display: flex;
justify-content: end;
`

export const UserAgreement : React.FC = () => {
    const {disagreements, submissionArray} = useContext(UserAgreementContext);
    const {popupSubject} = useContext(PopupContext);
    const {translate} = useTranslation();

    const submitToServer = async () => {
        try {
                const response = await fetch('api/result', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionArray),
            });
            if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Request Failed with status ${response.status}: ${errorText}`);
            }
                const result: Response = await response.json();
                return result;

            } catch (error) {
                console.error('Error sending data:', error);
                throw error;
            }
    }

    const handleClick = () => {
        if (disagreements.length > 0) {
            popupSubject.next({title: 'Form Incomplete', content: `Please fully read and agree to the following original documents:\n` + disagreements.map((val) => translate(val)).join(`\n`)});
        } else {
            popupSubject.next({title: 'Form Submitted!', content: `Thank you`});
            submitToServer();
        }
    }

    return (
        <Container>
            <Button onClick={handleClick}>Submit</Button>
            <span style={{width: '20px'}} />
        </Container>
    )
       
}