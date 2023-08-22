import { useEffect, useState } from "react";

import { useTenantsLayout } from "../../../layouts/tenants/context";

import {
  CheckBoxContainer,
  CreateRepairTicketContainer,
  FormInput,
  Message,
  SubmitButton,
} from "./styles";
import CheckBoxLog from "../../../components/checkBox";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../services/api";

export default function CreateRepairTicket() {
  const [message, setMessage] = useState("");

  const { showNavbar, hideNavbar } = useTenantsLayout();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
      location: e.target.location.value,
      additionalNotes: e.target.additionalNotes.value,
      visitAnytime: e.target.visitAnyTime.checked,
      tenantId: user.tenantId,
      listingId: user.listingId,
      status: "OPEN",
    };

    try {
      const { data } = await api.post("/tenant/ticket-repair", formData);

      setMessage("Your ticket has been submitted");

      console.log(data);

      e.target.reset();
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    hideNavbar();

    return showNavbar;
  }, [hideNavbar, showNavbar]);

  return (
    <CreateRepairTicketContainer onSubmit={handleSubmit}>
      <FormInput placeholder="NAME OF THE ISSUE" name="name" />

      <FormInput placeholder="DESCRIPTION" name="description" />

      <FormInput placeholder="LOCATION" name="location" />

      <FormInput placeholder="ADDITIONAL NOTES" name="additionalNotes" />

      <CheckBoxContainer>
        <CheckBoxLog name="visitAnyTime" />

        <span>VISIT THE PROPERTY ANYTIME</span>
      </CheckBoxContainer>

      <Message>{message}</Message>

      <SubmitButton>Submit</SubmitButton>
    </CreateRepairTicketContainer>
  );
}
