import "../styles/Responsive/tenantsMobile.css";
import { useRef, useState } from "react";
import TenantNavBar from "./TenantNavBar";
import PropTypes from "prop-types";
import axios from "axios";
import { api } from "../services/api";

const TenantComplaintTicket = ({ onCloseModal }) => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // adding manually the tenantId and listingId
    const updateFormData = { ...formData, tenantId: 1, listingId: 1 };
    console.log(updateFormData);
    try {
      const response = await api.post('/tenant/ticket-complaint', updateFormData)

      console.log(response);
      formRef.current.reset();
      setMessage("Your complain has been submitted");
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong,please try again");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="containerTicketRepair p-2">
      <TenantNavBar
        title="Create A COMPLAINT TICKET"
        onCloseModal={onCloseModal}
      />
      {/* form */}
      <div className="flex-grow-1  w-100 ">
        <form
          className="d-flex flex-column h-100 justify-content-between w-100"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div>
            <input
              className="form-control mb-2"
              onChange={handleChange}
              id="cause"
              name="cause"
              placeholder="CAUSE"
              required
            />
            <textarea
              className="form-control mb-2"
              onChange={handleChange}
              id="additionalNotes"
              name="additionalNotes"
              placeholder="ADDITIONAL NOTES"
              required
            />
          </div>
          <div>
            <p
              className="text-center"
              style={{ color: "#197572", fontWeight: "500" }}
            >
              {message}
            </p>
          </div>
          <div>
            <button
              className="btn btn-primary w-100"
              type="submit"
              style={{
                backgroundColor: "#197572",
                outline: "none",
                border: "none",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
TenantComplaintTicket.propTypes = {
  title: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default TenantComplaintTicket;
