/* eslint-disable react-hooks/rules-of-hooks */
import { DateTime } from "luxon";

import { api } from "../../../services/api";
import { formatDate } from "../../../services/date";
import { redirect } from "react-router-dom";

const createDocumentsLoader = (signOut) => async () => {
  let tenantId;
  let userEmail;

  try {
    const { data: loggedUser } = await api.get("/auth/local/session");

    tenantId = loggedUser.tenantId;
    userEmail = loggedUser.email;
  } catch (err) {
    signOut();
    return redirect("/");
  }

  const { data: sentDocuments } = await api.get(
    `/tenant/${tenantId}/document/sent`
  );

  const tenantDocuments = await Promise.all(
    sentDocuments.map(async (sentDocument) => {
      try {
        const { data: documentDetail } = await api.get(
          `/tenant/${tenantId}/document/${sentDocument.Document.docId}/detail`
        );

        console.log(documentDetail, userEmail);

        const applicantRecipient = documentDetail.recipients.find(
          (recipient) => recipient.email === userEmail
        );
        const signUrl = applicantRecipient?.sharedLink;
        const isSigned = applicantRecipient?.hasCompleted;

        return {
          ...sentDocument,
          status: documentDetail.status,
          signUrl,
          isSigned,
          date: formatDate({
            date: sentDocument.createdAt,
            formatOptions: DateTime.DATE_MED,
          }),
        };
      } catch (error) {
        console.error(`Error fetching document details: ${error.message}`);
        return {
          ...sentDocument,
          status: "Error",
          error: error.message,
        };
      }
    })
  );

  console.log(tenantDocuments);

  return tenantDocuments;
};

export default createDocumentsLoader;
