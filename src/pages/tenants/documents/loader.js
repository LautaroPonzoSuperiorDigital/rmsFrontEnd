/* eslint-disable react-hooks/rules-of-hooks */
import { DateTime } from "luxon"

import { api } from "../../../services/api"
import { formatDate } from "../../../services/date"
import { redirect } from "react-router-dom"

const createDocumentsLoader = (signOut) => async () => {
  let tenantId

  try {
    const { data: loggedUser } = await api.get('/auth/local/session')

    tenantId = loggedUser.tenantId
  } catch (err) {
    signOut()
    return redirect('/')
  }

  const { data } = await api.get(`/tenant/${tenantId}/document`)

  const tenantDocuments = data.map(tenantDocument => ({
    ...tenantDocument,
    date: formatDate(tenantDocument.createdAt, null, DateTime.DATE_MED)
  }))

  return tenantDocuments
}

export default createDocumentsLoader