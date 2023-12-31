import { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  BoxDocuments,
  DateTextDocuments,
  TitleDocuments,
} from "../modals/style";
import { ListingDocumentsContainer } from "./styles";
import { useAuth } from "../../hooks/useAuth";
// import SendTemplateIcon from "../../assets/img/SendTemplateIconHover.svg";
import SendTemplateIconHover from "../../assets/img/SendTemplateIconHover.svg";
import { useListingDetails } from "../../hooks/useListingDetails";

export function ListingDocuments() {
  const { user } = useAuth();
  const { listing } = useListingDetails();
  const [tenant, setTenant] = useState({});
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    api
      .get(`/listing/${listing.id}/tenants`)
      .then((response) => {
        const tenantsData = response.data;
        const _tenant = tenantsData.map((tenant) => tenant.Listings[0])[0];
        setTenant(_tenant);

        return api.get(`/tenant/${_tenant.id}/document-template`);
      })
      .then((response) => {
        const templatesData = response.data.results;
        setTemplates(templatesData);
      })
      .catch((error) => {
        alert("Error loading data:", error);
      });
  }, [listing]);

  const handleDocumentHover = () => {};

  const handleSendPandadocClick = async (
    documentId,
    isHovered,
    localAdminData
  ) => {
    let responseDocumentId;
    let name_split = String(localAdminData.name).split(" ");
    let f_name = name_split[0];
    let l_name = name_split.slice(1).join(" ");
    let requestCreateData = {
      templateUuid: documentId,
      name: `California S. R. L. Agreement - ${localAdminData.name} and ${tenant.User.name}`,
      recipients: [
        {
          email: localAdminData.email,
          first_name: f_name,
          last_name: l_name,
          role: "ADMIN",
        },
        {
          email: tenant.User.email,
          first_name: String(tenant.User.name).split(" ")[0],
          last_name: String(tenant.User.name).split(" ")[1] || null,
          role: "TENANT",
        },
      ],
      tags: ["rms-frontend"],
    };
    if (!requestCreateData.recipients[0].email) {
      throw new Error("Bad Admin Data.");
    }

    await api
      .post(
        `/tenant/${tenant.id}/document-template/create-document`,
        requestCreateData
      )
      .then((response) => {
        if (response.status > 201) throw new Error("Could not create document");
        responseDocumentId = response.data.id;
      })
      .catch((e) => {
        throw new Error(e);
      });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const requestSendData = {
      subject: "Listing document sign",
      message: "You were invited to sign the following document:",
      silent: false,
    };

    await api
      .post(
        `/tenant/${tenant.id}/document/${responseDocumentId}/send`,
        requestSendData
      )
      .then((response) => {
        if (response.status > 201) throw new Error("Could not create document");
        return alert("Document sent!");
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  return (
    <ListingDocumentsContainer>
      <div className="renderBoxsOrder d-flex align-items-start justify-content-start gap-5">
        <div className="renderBoxsOrder d-flex align-items-start justify-content-start gap-5">
          {templates.map((template) => (
            <div className="d-flex" key={template.id}>
              <BoxDocuments>
                <div className="flex flex-column" style={{ width: "100%" }}>
                  <TitleDocuments className="">{template.name}</TitleDocuments>
                  <DateTextDocuments>
                    {new Date(template.dateCreated).toDateString()}
                  </DateTextDocuments>
                </div>
                <div className="d-flex justify-content-end">
                  <img
                    src={SendTemplateIconHover}
                    alt="SendTemplateIconHover"
                    className="imgBtnDocs delBox"
                    onMouseLeave={() => handleDocumentHover(null)}
                    onClick={() =>
                      handleSendPandadocClick(template.id, false, user)
                    }
                  />
                </div>
              </BoxDocuments>
            </div>
          ))}
        </div>
      </div>
    </ListingDocumentsContainer>
  );
}
