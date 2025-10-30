'use client';
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button<{small?: boolean}>`
    box-shadow : 0 4px 8px 0 rgba(0,0,0,0.2);
    transition : 0.3s;
    padding: ${({small}) => (small ? '0px' : '8px')};
    margin: ${({small}) => (small ? '0px' : '4px')};
    width: fit-content;
    ${({small}) => small ? `height: fit-content;` : ''}
    border-radius: ${({small}) => (small ? '6px' : '10px')};;
    :hover:enabled {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        background: grey;
        color: white;
    }
`

export interface ButtonProps {
    disabled?: boolean;
    small?: boolean;
    onClick?: () => void;
    children?: ReactNode;
}

export const Button : React.FC<ButtonProps> = ({children, ...rest}) => {
    return (
            <StyledButton {...rest}>{children}</StyledButton>
    )
}