import { useEffect, useState } from "react"

import { useTenantsLayout } from "../../../layouts/tenants/context"
import { useAuth } from "../../../hooks/useAuth"
import { api } from "../../../services/api"

import { CreateComplaintTicketContainer, FormInput, Message, SubmitButton } from "./styles"

export default function CreateComplaintTicket() {
  const [message, setMessage] = useState('')
  
  const { showNavbar, hideNavbar } = useTenantsLayout()
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      cause: e.target.cause.value,
      additionalNotes: e.target.additionalNotes.value,
      tenantId: user.tenantId,
      listingId: 1,
    }

    try {
      const { data } = await api.post("/tenant/ticket-complaint", formData);
      
      setMessage("Your ticket has been submitted");
      
      console.log(data)

      e.target.reset()
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    hideNavbar()

    return showNavbar
  }, [hideNavbar, showNavbar])

  return (
    <CreateComplaintTicketContainer onSubmit={handleSubmit}>
      <FormInput
        placeholder="CAUSE"
        name="cause"
      />

      <FormInput
        placeholder="ADDITIONAL NOTES"
        name="additionalNotes"
      />

      <Message>{message}</Message>

      <SubmitButton>
        Submit
      </SubmitButton>
    </CreateComplaintTicketContainer>
  )
}