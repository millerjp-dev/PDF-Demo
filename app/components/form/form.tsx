'use client';
import React, { useEffect, useRef, useState } from "react";
import { DocumentDisplay } from "../document-display/document-display";
import { UserAgreementProvider } from "../user-agreement/user-agreement-provider";
import { UserAgreement } from "../user-agreement/user-agreement";
import { PopupProvider } from "../popup/popup-provider";
import { Popup } from "../popup/popup";

interface apiInterface {
    legalFileRecordId: string,
    type: "VENDOR_AGREEMENT" | "TERMS_OF_SERVICE",
    fileName: string,
    version: number,
    changesOnly: boolean
}

interface VenTermDocuments {
    [key: string]: {fileNames: {original: string, changes?: string}}
}

export const Form : React.FC = () => {

    const documents = useRef<VenTermDocuments>({});
    const [documentsState, setDocumentsState] = useState<VenTermDocuments>({});
    const [submissionArray, setSubmissionArray] = useState<{[key: string] : boolean}>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('api/documents');
                const resJson = await res.json();
                if (resJson) {
                    (resJson as apiInterface[]).forEach((val) => {
                        if (!documents.current[val.type]) {
                            documents.current[val.type] = {fileNames: {original: ''}}
                        }
                        setSubmissionArray((ar) => {
                            ar[val.legalFileRecordId] = true;
                            return ar;
                        })

                        if (!val.changesOnly) {
                                documents.current[val.type].fileNames.original = 'documents/' +val.fileName;
                        } else {
                            documents.current[val.type].fileNames.changes = 'documentsf/' + val.fileName;
                        }
                    })
                    setDocumentsState(documents.current);
                }
            } catch (e) {
                console.log('error: ' + e);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <PopupProvider>
                <div style={{display: 'flex'}}>
                <UserAgreementProvider submissionArray={submissionArray}>
                    {Object.keys(documentsState).map((key) => (
                        <DocumentDisplay key={key} documents={documentsState[key].fileNames} title={key} />
                    ))}
                    <UserAgreement />
                </UserAgreementProvider>
                </div>
                <Popup />
            </PopupProvider>
        </div>
        
    )
}