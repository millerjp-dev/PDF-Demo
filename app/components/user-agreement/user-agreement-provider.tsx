"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { UserAgreementContext } from "./user-agreement-context";

import {Subject} from 'rxjs';

export const UserAgreementProvider: React.FC<{children: ReactNode, submissionArray: {[key: string]: boolean}}> = ({children, submissionArray}) => {
    const [disagreements, setDisagreements] = useState<string[]>([]);
    const agreementsSubject = useRef(new Subject<{id: string, val: boolean}>());

    useEffect(() => {
        agreementsSubject.current.subscribe((change) => {
            setDisagreements((di) => {
                const index = di.indexOf(change.id)
                if (!change.val) {
                    if (index === -1) {
                        di.push(change.id);
                    }
                } else {
                    if (index !== -1) {
                        di.splice(index, 1);
                    }
                }
                return di;
            })
        })
    }, []);
    
    return (
        <UserAgreementContext.Provider value={{agreementsSubject: agreementsSubject.current, disagreements, submissionArray}}>
            {children}
        </UserAgreementContext.Provider>
    )
}