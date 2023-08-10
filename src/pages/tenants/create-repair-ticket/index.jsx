import { useEffect, useState } from "react"

import { useTenantsLayout } from "../../../layouts/tenants/context"

import { CheckBoxContainer, CreateRepairTicketContainer, FormInput, Message, SubmitButton } from "./styles"
import CheckBoxLog from "../../../components/checkBox"
import { useAuth } from "../../../hooks/useAuth"
import { api } from "../../../services/api"

export default function CreateRepairTicket() {
  const [message, setMessage] = useState('')
  
  const { showNavbar, hideNavbar } = useTenantsLayout()
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
      location: e.target.location.value,
      additionalNotes: e.target.additionalNotes.value,
      visitAnytime: e.target.visitAnyTime.checked,
      tenantId: user.tenantId,
      listingId: 1,
    }

    try {
      const { data } = await api.post("/tenant/ticket-repair", formData);
      
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
    <CreateRepairTicketContainer onSubmit={handleSubmit}>
      <FormInput
        placeholder="Name of the issue"
        name="name"
      />

      <FormInput
        placeholder="Description"
        name="description"
      />

      <FormInput
        placeholder="Location"
        name="location"
      />

      <FormInput
        placeholder="Additional Notes"
        name="additionalNotes"
      />

      <CheckBoxContainer>
        <CheckBoxLog name="visitAnyTime" />

        <label>
          VISIT THE PROPERTY ANYTIME
        </label>
      </CheckBoxContainer>

      <Message>{message}</Message>

      <SubmitButton>
        Submit
      </SubmitButton>
    </CreateRepairTicketContainer>
  )
}