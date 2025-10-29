import React, {createContext} from "react";
import { Subject } from "rxjs";


const defaultContext: {
    popupSubject : Subject<{title: string, content: string}>;
} = {
    popupSubject : new Subject(),
}

export const PopupContext = createContext(defaultContext);