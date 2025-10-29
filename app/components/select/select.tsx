'use client';
import React, { ReactNode } from "react";
import styled from "@emotion/styled";

const StyledSelect = styled.select`
    border-radius: 10px;
`;


export interface ButtonProps {
    onChange: (selected: string) => void;
    options?: string[];
    value: string;
}

const capatlizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
} 

export const Select : React.FC<ButtonProps> = ({options, value, onChange}) => {
    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        onChange(event.currentTarget.value);
    }
    return (
            <StyledSelect value={value} onChange={handleChange}>
                {options?.map((option) => (
                    <option key={option} value={option}>{capatlizeFirstLetter(option)}</option>
                ))}
            </StyledSelect>
    )
}