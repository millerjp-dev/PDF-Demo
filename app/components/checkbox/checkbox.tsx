'use client';
import React, { ReactNode } from "react";
import styled from "@emotion/styled";

const StyledCheckbox = styled.input`
    box-shadow : 0 4px 8px 0 rgba(0,0,0,0.2);
    transition : 0.3s;
    padding: 6px;
    margin: 4px;
    width: fit-content;
    border-radius: 5px;
    :hover:enabled {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.1);
        color: white;
    }
`
const StyledLabel = styled.label<{disabled?: boolean}>`
    color: ${({disabled}) => disabled ? 'grey' : 'black'};
`

const Container = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100%;
`;

export const Checkbox : React.FC<{disabled?: boolean, children: ReactNode, onChange: (val: boolean) => void}> = ({disabled, children, onChange}) => {
    
    const handleChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
        onChange(event.currentTarget.checked)
    }
    
    return (
        <Container>
            <StyledLabel disabled={disabled}>
                <StyledCheckbox onChange={handleChange} disabled={disabled} type="checkbox"></StyledCheckbox>{children}
            </StyledLabel>
        </Container>
    )
}