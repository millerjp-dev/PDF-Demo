'use client';
import React, { ReactNode } from "react";
import styled from "@emotion/styled";

const StyledCard = styled.div`
    box-shadow : 0 4px 8px 0 rgba(0,0,0,0.2);
    transition : 0.3s;
    padding: 12px;
    margin: 20px;
    width: fit-content;
    border-radius: 10px;
    background: rgba(243, 243, 243, 1);
    :hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`

const StyledCardTitle = styled.div`
    font-size: 1.4em;
    font-weight: bold;
    color: rgba(72, 142, 189, 1);
    display: flex;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 20px;
`

const Container = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
`;

export const Card : React.FC<{title?: string, children: ReactNode}> = ({title, children}) => {
    return (
        <Container>
            <StyledCard>
                {title && (
                    <StyledCardTitle>{title}</StyledCardTitle>
                )}
                {children}
            </StyledCard>
        </Container>
    )
}