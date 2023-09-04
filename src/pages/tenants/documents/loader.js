/* eslint-disable react-hooks/rules-of-hooks */
import { DateTime } from "luxon"

import { api } from "../../../services/api"
import { formatDate } from "../../../services/date"
import { redirect } from "react-router-dom"

const createDocumentsLoader = (signOut) => async () => {
  let tenantId
  let userEmail

  try {
    const { data: loggedUser } = await api.get('/auth/local/session')

    tenantId = loggedUser.tenantId
    userEmail = loggedUser.email
  } catch (err) {
    signOut()
    return redirect('/')
  }

  // const { data } = await api.get(`/tenant/${tenantId}/document`)

  // const tenantDocuments = data.map(tenantDocument => ({
  //   ...tenantDocument,
  //   date: formatDate(tenantDocument.createdAt, null, DateTime.DATE_MED)
  // }))

  // return tenantDocuments

  const { data: sentDocuments } = await api.get(`/tenant/${tenantId}/pandadoc/document/sent`)

  const tenantDocuments = await Promise.all(
    sentDocuments
      .map(sentDocument =>
        api.get(`/tenant/${tenantId}/pandadoc/document/${sentDocument.Document.docId}/detail`)
          .then(({ data: documentDetail }) => {
            const applicantRecipient = documentDetail.recipients.find(recipient => recipient.email === userEmail)
            const signUrl = applicantRecipient?.sharedLink
            const isSigned = applicantRecipient?.hasCompleted
            
            return {
              ...sentDocument,
              status: documentDetail.status,
              signUrl,
              isSigned,
              date: formatDate(sentDocument.createdAt, null, DateTime.DATE_MED)
            }
          }))
  )

  console.log(tenantDocuments)

  return tenantDocuments
}

export default createDocumentsLoader