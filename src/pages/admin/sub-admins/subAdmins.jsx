import { useEffect, useState } from "react"
import Nav from "../../../components/nav"
import {
  BtnPlusSub,
  Table1,
  TableContainer,
  TableTd,
  TableTdEmail,
  TableThead
} from "./styles"
import DeleteIconHover from "../../../assets/img/deleteIconHover.svg"
import Delete from "../../../assets/img/delete.svg"
import ModalAddSub from "./ModalAddSub"
import { api } from "../../../services/api"
import { useAuth } from "../../../hooks/useAuth"
import { DeleteButton } from "../../../components/buttonApplicants"
import Pencil from "./../../../assets/img/pencil.svg"
import ModalUpdateSub from "./ModalUpdateSub"
import SearchListings from "../../../components/searchListings"

const tBodyStyle = {
  height: "50px"
}

const SubAdmins = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isUpdateModal, setUpdatemodal] = useState(false)
  const [subAdmins, setSubAdmins] = useState([])
  const [subAdminTable, setSubAdminTable] = useState([])
  const [update, setUpdate] = useState(false)
  const { user } = useAuth()

  const updateModalOpen = () => {
    setUpdatemodal(true)
  }
  const updateModalClose = () => {
    setUpdatemodal(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/sub-admin/${id}`)
      console.log(res)
      setUpdate(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchSubAdmin = async () => {
      try {
        const response = await api.get(`/sub-admin`)
        setSubAdmins(response.data)
        setSubAdminTable(response.data)
        console.log(response.data)
        setUpdate(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSubAdmin()
  }, [update])

  return (
    <div>
      <Nav />
      <div className="d-flex w-100 mb-1">
        <div className="container tenantsContainer">
          <div className="d-flex align-items-center justify-content-start">
            <h2 className="tenantsText">Sub Admins</h2>
            <div className="form-check ms-3 mb-1"></div>
          </div>
        </div>
        <div className="container-fluid ListingContainer d-flex justify-content-end bttonContainer align-items-center">
          <SearchListings
            className="searchApplicants"
            applicants={subAdmins}
            setTableApplicants={setSubAdminTable}
          />
          {user.role === "ADMIN" && (
            <BtnPlusSub onClick={openModal}> + add sub admin</BtnPlusSub>
          )}
        </div>
      </div>
      <TableContainer>
        <Table1>
          <TableThead>
            <TableTd className="bor NAME1">
              <p className="mb-2 g" style={{ width: "150px", margin: 0 }}>
                NAME
              </p>
            </TableTd>
            <TableTd className=" bor LISTING1">
              <p className="mb-2 g" style={{ width: "150px" }}>
                ROLE
              </p>
            </TableTd>

            <TableTdEmail className="bor EMAIL1">
              <p className="mb-2 g" style={{ width: "150px" }}>
                EMAIL
              </p>
            </TableTdEmail>

            <td className="bor">
              <p className="">ACTIONS</p>
            </td>
          </TableThead>

          <tbody style={tBodyStyle}>
            {subAdminTable.map((item) =>
              item === 0 ? null : (
                <tr className="tr-hover" key={item.id}>
                  <td className="bor1">
                    <div className="mt-3 " style={{ width: "150px" }}>
                      <p>{item.User.name}</p>
                    </div>
                  </td>

                  <td className="bor1">
                    <div className="mt-3 " style={{ width: "150px" }}>
                      <p>
                        {item.User.role
                          .replace(/_/g, " ")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </p>
                    </div>
                  </td>
                  <td className="bor1">
                    <div className="mt-3" style={{ width: "150px" }}>
                      <p>{item.User.email}</p>
                    </div>
                  </td>
                  <td className="bor1">
                    <div className="d-flex align-items-center">
                      {user.role === "ADMIN" && (
                        <>
                          <button className="btn-sm">
                            <img
                              src={Pencil}
                              alt="Pencil"
                              onClick={updateModalOpen}
                            />
                          </button>

                          <ModalUpdateSub
                            isOpen={isUpdateModal}
                            onClose={updateModalClose}
                            setUpdate={setUpdate}
                            id={item.User.id}
                          />
                          <DeleteButton
                            info={"Sub Admin"}
                            onClick={() => handleDelete(item.User.id)}
                            defaultImage={<img src={Delete} alt="Delete" />}
                            hoverImage={
                              <img
                                src={DeleteIconHover}
                                alt="DeleteIconHover"
                              />
                            }
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table1>
      </TableContainer>
      <ModalAddSub
        isOpen={isModalOpen}
        onClose={closeModal}
        setUpdate={setUpdate}
      />
    </div>
  )
}

export default SubAdmins
