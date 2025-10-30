"use client";
import React, { useContext, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { PdfContext } from "./pdf-context";
import * as pdfjsLib from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { OnDocumentLoadSuccess, OnError } from "react-pdf/src/shared/types.js";
import { Button } from "../button/button";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const PdfDisplay: React.FC = () => {
    const pdfContext = useContext(PdfContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();

    const handleLoadSuccess : OnDocumentLoadSuccess = (doc) => {
        setLoading(false);
        pdfContext.onLoadSuccess(doc)
    }

    const handleError : OnError = (e) => {
        setError(e);
    }

    useEffect(()=> {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(undefined);
    }, [pdfContext.name])

    return (
        <div style={{height: '500px', minWidth: '300px', position: 'relative', border: 'solid 1px black'}}>
            {error && <p>Error loading PDF: {error.message}</p>}
            {!error && (
            <div><Document
                file={pdfContext.document}
                onLoadSuccess={handleLoadSuccess}
                onLoadError={handleError}
            >
                <Page height={500} pageNumber={pdfContext.pageNumber} />
            </Document>
            <div style={{position: 'absolute', top: '-50px', right: '0'}}><Button small disabled={loading || error} onClick={()=> {window.open(pdfContext.document, '_blank')}}><FileDownloadIcon fontSize="small" /></Button></div>
            </div>
            )}
        </div>
    )
}