/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { api } from "../../../services/api"

const ButtonTenant = ({
  moveToTenant,
  tenantId,
  setNewTanant,
  applicantionScreening
}) => {
  const listingId = applicantionScreening[0]?.listingId
  const animationContainerRef = useRef(null)
  const [message, setMessage] = useState(null)

  const handleMoveToTenant = async (e) => {
    e.stopPropagation()
    try {
      const tenant = await api.patch(
        `/tenant/${tenantId}/listing/${listingId}/approved`
      )
      setNewTanant(true)
    } catch (err) {
      console.log(err)
      setMessage(err.response.data.message)
    }
  }

  useEffect(() => {}, [moveToTenant])

  return (
    <div className="mb-1 ">
      <button className="mttContainer" onClick={(e) => handleMoveToTenant(e)}>
        Move To Tenants
      </button>
      {message && <p className="text-danger">{message}</p>}
    </div>
  )
}

export default ButtonTenant
