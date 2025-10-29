"use client";
import React, { useContext, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { PdfContext } from "./pdf-context";
import * as pdfjsLib from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { OnDocumentLoadSuccess, OnError } from "react-pdf/src/shared/types.js";

export const PdfDisplay: React.FC = () => {
    const pdfContext = useContext(PdfContext);
    const [loading, setLoading] = useState(false);
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
        setLoading(false);
        setError(undefined);
    }, [pdfContext.name])

    return (
        <div style={{height: '500px', minWidth: '300px'}}>
            {loading && <p>Loading PDF...</p>}
            {error && <p>Error loading PDF: {error.message}</p>}
            {!loading && !error && (
            <Document
                file={pdfContext.document}
                onLoadSuccess={handleLoadSuccess}
                onLoadError={handleError}
            >
                <Page height={500} pageNumber={pdfContext.pageNumber} />
            </Document>
            )}
        </div>
    )
}