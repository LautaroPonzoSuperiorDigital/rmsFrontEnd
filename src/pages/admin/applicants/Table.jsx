/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { DeleteButton } from "../../../components/buttonApplicants"
import Delete from "../../../assets/img/delete.svg"
import DeleteIconHover from "../../../assets/img/deleteIconHover.svg"
import TableSelect from "./TableSelect"
import ButtonTenant from "./ButtonTenant"
import { api } from "../../../services/api"
import { useAuth } from "../../../hooks/useAuth"
import ApplicantModal from "./ApplicantsModal/Applicant-modal/Applicant-modal"
const tBodyStyle = {
  height: "50px"
}

const Table = ({
  applicants,
  setNewTanant,
  setApplicants,
  setTableApplicants,
  setDeleteTenant
}) => {
  const [moveToTenant, setMoveToTenant] = useState([])
  const [applicant, setApplicant] = useState([])
  const { user } = useAuth()
  const [isApplicantModal, setApplicantModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const handleOpenApplicantModal = (id) => {
    const selectedApplicant = applicant.find((item) => item.id === id)
    setSelectedApplicant(selectedApplicant)
    setApplicantModal(true)
  }
  const handleCloseApplicantModal = () => {
    setApplicantModal(false)
  }
  const HandleDelete = async (id, e) => {
    console.log(id)
    e.stopPropagation()
    try {
      const res = await api.delete(`tenant/${id}`)
      setDeleteTenant(true)
    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(applicants)
    setApplicant(applicants)
  }, [applicants])

  return (
    <>
      {" "}
      <table className="table table-responsive-lg">
        <thead className="tables">
          <td className=" NAME1">
            <p className="mb-2 g" style={{ width: "150px", margin: 0 }}>
              NAME
            </p>
          </td>
          <td className="bor LISTING1">
            <p className="mb-2 g">LISTINGS</p>
          </td>
          <td className="bor">
            <p className="mb-2 ms-5 g">APPROVAL STATUS</p>
          </td>
          <td className="bor EMAIL1">
            <p className="mb-2 g">EMAIL</p>
          </td>
          <td className="bor">
            <p className="mb-2 g">PHONE</p>
          </td>
          <td className="bor whiteSpace"></td>
          <td className="bor">
            <p className="deleteText g">DELETE</p>
          </td>
        </thead>

        <tbody style={tBodyStyle}>
          {applicant.map((item) =>
            item.length === 0 ||
            item.User.ApplicationScreening.length == 0 ? null : (
              <>
                <tr
                  className="tr-hover"
                  key={item.id}
                  onClick={(event) => {
                    handleOpenApplicantModal(item.id)
                  }}
                >
                  <td className="bor1">
                    <div
                      className="mt-3   Person"
                      style={{ width: "150px", margin: 0 }}
                    >
                      <p>{item.User.name}</p>
                    </div>
                  </td>
                  <td className="bor1">
                    <div className="mt-3 ms-2" style={{ width: "250px" }}>
                      <p key={item.id} style={{ margin: "0px" }}>
                        {item.User?.ApplicationScreening[0]?.Listing?.location}
                      </p>
                    </div>
                  </td>
                  <td className="bor1">
                    <div className="mt-3 ms-5">
                      {item.approvalStatus && (
                        <TableSelect
                          approbalStatus={item.approvalStatus}
                          key={item.id}
                          tenantId={item.id}
                          setMoveToTenant={setMoveToTenant}
                          setApplicants={setTableApplicants}
                        />
                      )}
                    </div>
                  </td>
                  <td className="bor1">
                    <div className="mt-3" style={{ width: "100px" }}>
                      <p style={{ margin: "0px" }}>{item.User.email}</p>
                    </div>
                  </td>
                  <td className="bor1">
                    <div className="mt-3 ms-1">
                      <p>{item.phoneNumber}</p>
                    </div>
                  </td>
                  <td className="bor1">
                    <div className="mtt">
                      {item.approvalStatus === "LEASE_AGREEMENT_SIGNED" && (
                        <ButtonTenant
                          key={item.id}
                          applicantionScreening={item.User.ApplicationScreening}
                          tenantId={item.id}
                          approvalStatus={item.approvalStatus}
                          setNewTanant={setNewTanant}
                        />
                      )}
                    </div>
                  </td>
                  <td className="bor1">
                    <div className="deleteBtn1">
                      <DeleteButton
                        info={"Tenant"}
                        onClick={(e) => HandleDelete(item.id, e)}
                        defaultImage={<img src={Delete} alt="Delete" />}
                        hoverImage={
                          <img src={DeleteIconHover} alt="DeleteIconHover" />
                        }
                      />
                    </div>
                  </td>
                </tr>
              </>
            )
          )}
        </tbody>
      </table>
      {isApplicantModal && (
        <ApplicantModal
          selectedTenant={selectedApplicant}
          onClose={handleCloseApplicantModal}
        />
      )}
    </>
  )
}

export default Table
