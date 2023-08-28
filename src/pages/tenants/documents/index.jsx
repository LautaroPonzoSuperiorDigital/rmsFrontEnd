import { useLoaderData } from "react-router-dom"

import {
  Document,
  DocumentDate,
  DocumentFooter,
  DocumentHeader,
  DocumentSigned,
  DocumentTitle,
  DocumentsContainer,
  SignDocument,
} from "./styles"

export default function Documents() {
  const tenantDocuments = useLoaderData()

  return (
    <DocumentsContainer>
      {tenantDocuments.map(tenantDocument => {
        const isSigned = tenantDocument.signUrl && tenantDocument.isSigned

        return (
          <Document key={tenantDocument.id}>
            <DocumentHeader>
              <DocumentTitle>{tenantDocument.Document.name}</DocumentTitle>

              {!isSigned && (
                <SignDocument to={tenantDocument.signUrl} target="_blank">Sign</SignDocument>
              )}
            </DocumentHeader>

            <DocumentFooter>
              <DocumentDate>{tenantDocument.date}</DocumentDate>
              
              {isSigned && (
                <DocumentSigned>Signed</DocumentSigned>
              )}
            </DocumentFooter>
          </Document>
        )})}
    </DocumentsContainer>
  )
}