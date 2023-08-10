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
      {tenantDocuments.map(tenantDocument => (
        <Document key={tenantDocument.id}>
          <DocumentHeader>
            <DocumentTitle>{tenantDocument.Document.name}</DocumentTitle>

            {tenantDocument.Document.isSignRequired && !tenantDocument.Document.isSigned && (
              <SignDocument>Sign</SignDocument>
            )}
          </DocumentHeader>

          <DocumentFooter>
            <DocumentDate>{tenantDocument.date}</DocumentDate>
            
            {tenantDocument.Document.isSigned && (
              <DocumentSigned>Signed</DocumentSigned>
            )}
          </DocumentFooter>
        </Document>
      ))}
    </DocumentsContainer>
  )
}