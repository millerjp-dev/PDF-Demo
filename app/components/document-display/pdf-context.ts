import React, {createContext} from "react";
import { OnDocumentLoadSuccess } from "react-pdf/src/shared/types.js";


const defaultContext: {
    onLoadSuccess: OnDocumentLoadSuccess,
    document: string,
    pageNumber: number,
    name: string
} = {
    onLoadSuccess: () => undefined,
    document : "",
    pageNumber: 1,
    name: ''
}

export const PdfContext = createContext(defaultContext);