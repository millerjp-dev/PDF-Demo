"use client";
import React, { useContext, useEffect, useState } from "react";

import dynamic from 'next/dynamic';
import { PdfDisplay } from "../document-display/pdf-display";
import { PdfContext } from "./pdf-context";
import { OnDocumentLoadSuccess } from "react-pdf/src/shared/types.js";
import { Button } from "../button/button";
import { Checkbox } from "../checkbox/checkbox";
import { Select } from "../select/select";
import { useTranslation } from "@/app/utilities/useTranslation";
import { Card } from "../card/card";
import { UserAgreementContext } from "../user-agreement/user-agreement-context";

dynamic<{ inline?: boolean }>(
  () => import('../document-display/pdf-display').then(mod => mod.PdfDisplay),
  {ssr: false}
)

export interface DocumentDisplayProps {
    documents: {original: string, changes?: string};
    title: string;
}

export const DocumentDisplay: React.FC<DocumentDisplayProps> = ({documents, title}: DocumentDisplayProps) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPage, setMaxPage] = useState<number>();
    const [reachedEnd, setReachedEnd] = useState(false);
    const [currentVersion, setCurrentVersion] = useState("changes");
    const {translate} = useTranslation();
    const {agreementsSubject} = useContext(UserAgreementContext);
    const [userAgreementValue, setAgreementValue] = useState(false)

    const onLoadSuccess: OnDocumentLoadSuccess = ({numPages}) => {
        setMaxPage(numPages);
    }

    useEffect(() => {
        if (pageNumber === maxPage) {
            setReachedEnd(true);
        }
    }, [maxPage, pageNumber]);

    useEffect(() => {
        setPageNumber(1);
    }, [currentVersion]);

    useEffect(() => {
        agreementsSubject.next({id: title, val: userAgreementValue})
    }, []);

    useEffect(() => {
        agreementsSubject.next({id: title, val: userAgreementValue})
    }, [userAgreementValue]);

    return (
        <Card title={translate(title)}>
            <PdfContext.Provider value={{onLoadSuccess, document: currentVersion === 'changes' && documents.changes ? documents.changes : documents.original, pageNumber, name: currentVersion === 'changes' ? 'changes' : 'original'}} >
                <PdfDisplay />
            </PdfContext.Provider>
            
            <div style={{justifyContent: 'space-between', display: 'flex'}}>
                <Button disabled={pageNumber === 1} onClick={() => setPageNumber(page => Math.max(page - 1, 1))}>Back</Button>
                {Object.keys(documents).length > 1 && (
                    <Select value={currentVersion} options={Object.keys(documents)} onChange={(val) => setCurrentVersion(val)} />
                )}
                <Button disabled={(maxPage || 1) <= pageNumber} onClick={() => setPageNumber(page => Math.min(page + 1, maxPage || 1))}>Next</Button>
            </div>
            <div style={{height: '20px'}}/>
            <Checkbox onChange={setAgreementValue} disabled={!reachedEnd}>I have read and agree</Checkbox>
            <div style={{height: '20px'}}/>
        </Card>
        
    )
}