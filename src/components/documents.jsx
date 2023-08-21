import React, { useEffect, useState } from "react";
import Nav from "./nav";
import "../styles/Documents/documents.css";
import SearchListings from "./searchListings";
import { EditButton, DeleteButton } from "./buttonDocuments";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Pagination from "./paginations";
import Edit from "../assets/img/Edit.svg";
import EditHover from "../assets/img/EditHover.svg";
import Delete from "../assets/img/delete.svg";
import DeleteIconHover from "../assets/img/deleteIconHover.svg";
import AddDocuments from "./AddDocuments";
import AddDocs from "./modals/addDocumentsModal";
import { api } from "../services/api";
import jwtDecode from "jwt-decode";



const Documents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentsData, setDocumentsData] = useState([]);
  const [listingsData, setListingsData] = useState([]);
  const [decodedToken, setDecodedToken] = useState(null);
  const [tenantsData, setTenantsData] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    const token = localStorage.getItem("certifymyrent.token");
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      const adminId = decoded.sub;

      api.get(`admin/${adminId}/listing-documents`)
        .then(response => {
          setDocumentsData(response.data);
          const documentIds = response.data.map(document => document.listingId);
          api.get("/listing")
            .then(listingResponse => {
              const listings = listingResponse.data;
              const documentsWithListings = response.data.map(document => {
                const listing = listings.find(listing => listing.id === document.listingId);
                return { ...document, listing };
              });
              setDocumentsData(documentsWithListings);
              console.log("Listings Data:", documentsWithListings);
            })
            .catch(error => {
              console.error("Error fetching listings data:", error);
            });
        })
        .catch(error => {
          console.error("Error fetching documents data:", error);
        });
    }
  }, []);


  const handleDelete = async (documentId, tenantId) => {
    try {
      const updatedDocuments = documentsData.filter(document => document.id !== documentId);
      setDocumentsData(updatedDocuments);

      await api.delete(`tenant/${tenantId}/document/${documentId}`);
      console.log("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      // Revert the state update on error
      setDocumentsData([...updatedDocuments, documentToDelete]);
    }
  };





  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="d-flex w-100 mb-3">
          <div className="container tenantsContainer">
            <div className="d-flex align-items-center justify-content-start">
              <h2 className="tenantsText">Documents</h2>
              <div className="form-check ms-3 mb-1"></div>
            </div>
          </div>
          <div className="container-fluid ListingContainer d-flex justify-content-end bttonContainer">
            <SearchListings />
            <AddDocuments onClick={handleOpenModal} />
          </div>
        </div>
        <div className="container-fluid">
          <div className="ListingContainer">
            <div className="listingsContainer">
              <table className="table table-responsive-lg">
                <thead>
                  <tr>
                    <td>
                      <p className="NAME2 td p1">NAME</p>
                    </td>
                    <td tdFix>
                      <p className="LISTING2 td p1">LISTING</p>
                    </td>
                    <td>
                      <p className="TAG td p1">TAG</p>
                    </td>
                    <td tdFix>
                      <p className="DATE2 td p1">DATE</p>
                    </td>
                    <td tdFix>
                      <p className="ACTIONS2 td p1">ACTIONS</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {documentsData.map(document => (
                    <tr key={document.id} className="tr-hover">
                      <td className="h p1 td td2 tdFix">
                        <p className="location1">
                          <a
                            href={`https://rms-staging.s3.us-west-1.amazonaws.com/${document.Document.key}`}
                            download={document.Document.name}
                          >
                            {document.Document.name}
                          </a>
                        </p>
                      </td>
                      <td className="h p1 td td2">
                      </td>
                      <td className="h p1 td td2 tdFix">
                        <p className="location2">

                        </p>
                      </td>
                      <td className="h p1 td td2 tdFix">
                        <p className="date2">{format(new Date(), "MMM d, yyyy", { locale: enUS })}</p>
                      </td>
                      <td className="buttonContainer2 tdFix">
                        <div className="orderButtonContainer">
                          <EditButton
                            defaultImage={<img src={Edit} alt="Edit" />}
                            hoverImage={<img src={EditHover} alt="EditHover" />}
                          />
                          <DeleteButton
                            className="delete1"
                            defaultImage={<img src={Delete} alt="Delete" />}
                            hoverImage={<img src={DeleteIconHover} alt="DeleteIconHover" />}
                            onClick={() => handleDelete(document.id, document.Tenant.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <AddDocs onClose={handleCloseModal} listingsData={listingsData} />}
      <Pagination />
    </>
  );
};

export default Documents;