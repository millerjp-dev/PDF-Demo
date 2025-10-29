import React, {createContext} from "react";
import { Subject } from "rxjs";


const defaultContext: {
    agreementsSubject : Subject<{id: string, val: boolean}>;
    disagreements: string[];
    submissionArray: {[key: string] : boolean}
} = {
    agreementsSubject : new Subject(),
    disagreements: [],
    submissionArray: {}
}

export const UserAgreementContext = createContext(defaultContext);