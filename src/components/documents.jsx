import React, { useEffect, useState } from 'react'
import Nav from './nav'
import '../styles/Documents/documents.css'
import SearchListings from './searchListings'
import { EditButton, DeleteButton } from './buttonDocuments'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import Pagination from './paginations'
import Edit from '../assets/img/Edit.svg'
import EditHover from '../assets/img/EditHover.svg'
import Delete from '../assets/img/delete.svg'
import DeleteIconHover from '../assets/img/deleteIconHover.svg'
import AddDocuments from './AddDocuments'
import AddDocs from './modals/addDocumentsModal'
import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import Footer from './public/Footer'

const Documents = () => {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [documentsData, setDocumentsData] = useState([])
  const [listingsData, setListingsData] = useState([])
  const [tenantsData, setTenantsData] = useState([])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    api.get(`/admin/user/${user.id}`).then(({ data: userData }) => {
      api
        .get(`/listing?adminId=${userData.Admin.id}`)
        .then(({ data: listings }) => {
          listings.map(({ id }) => {
            api.get(`/listing/${id}/document`).then(({ data }) => {
              setDocumentsData([...data, ...documentsData])
            })
          })
        })
        .catch((error) => {
          console.error('Error fetching documents data:', error)
        })
    })
  }, [])

  const handleDelete = async (listingId, documentId) => {
    try {
      await api
        .delete(`listing/${listingId}/document/${documentId}`)
        .then(() => {
          const updatedDocuments = documentsData.filter(
            (document) => document.id !== documentId,
          )
          setDocumentsData(updatedDocuments)
        })
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
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
                  {documentsData.map((document) => (
                    <tr key={document?.id} className="tr-hover">
                      <td className="h p1 td td2 tdFix">
                        <p className="location1">
                          <a
                            href={`https://rms-staging.s3.us-west-1.amazonaws.com/${document?.key}`}
                            download={document?.name}
                          >
                            {document?.name}
                          </a>
                        </p>
                      </td>
                      <td className="h p1 td td2">
                        <p className="LISTING2 h">
                          {String(document.listingId).padStart(6, '0')}
                        </p>
                      </td>
                      <td className="h p1 td td2 tdFix">
                        <p className="location2"></p>
                      </td>
                      <td className="h p1 td td2 tdFix">
                        <p className="date2">
                          {format(new Date(), 'MMM d, yyyy', {
                            locale: enUS,
                          })}
                        </p>
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
                              <img
                                src={DeleteIconHover}
                                alt="DeleteIconHover"
                              />
                            }
                            onClick={() =>
                              handleDelete(document.Listing.id, document.id)
                            }
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
      <Footer />
      {isModalOpen && (
        <AddDocs onClose={handleCloseModal} listingsData={listingsData} />
      )}
      <Pagination />
    </div>
  )
}

export default Documents
