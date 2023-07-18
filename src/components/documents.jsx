import React, {useState} from "react";
import Nav from "./nav";
import "../styles/Documents/documents.css";
import SearchListings from "./searchListings";
import { EditButton, DeleteButton } from "./buttonDocuments";
import Pagination from "./paginations";
import Edit from "../assets/img/Edit.svg";
import EditHover from "../assets/img/EditHover.svg";
import Delete from "../assets/img/delete.svg";
import DeleteIconHover from "../assets/img/deleteIconHover.svg";
import AddDocuments from "./AddDocuments";
import AddDocs from "./modals/addDocumentsModal";



const Documents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                  <tr className="tr-hover">
                    <td className="h p1 td td2 tdFix">
                      <p className="location1">300 BC Lead Water</p>
                    </td>
                    <td className="h p1 td td2">
                      <p className="listingA">467800</p>
                    </td>
                    <td className="h p1 td td2 tdFix">
                      <p className="location2">Lead Waver</p>
                    </td>
                    <td className="h p1 td td2 tdFix">
                      <p className="date2">Feb 3, 2023</p>
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
                          hoverImage={
                            <img src={DeleteIconHover} alt="DeleteIconHover" />
                          }
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <AddDocs onClose={handleCloseModal} />}
      <Pagination />
    </>
  );
};

export default Documents;