import "../styles/Responsive/tenantsMobile.css";
import TenantNavBar from "./TenantNavBar";
import CheckBoxLog from "./checkBox";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { api } from "../services/api";
const TenantsRepairTicket = ({ onCloseModal }) => {
  const [formData, setFormData] = useState({});
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // adding manually the tenantId and listingId
    const updatedFormData = {
      ...formData,
      tenantId: 1,
      listingId: 1,
      visitAnytime: checked,
    };
    console.log(updatedFormData);
    try {
      const response = await api.post("/tenant/ticket-repair", updatedFormData);
      console.log(response);
      setMessage("Your ticket has been submitted");
      setChecked(false);
      formRef.current.reset();
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
      {/* nav */}
      <TenantNavBar
        title="CREATE A REPAIR TICKET"
        onCloseModal={onCloseModal}
      />
      {/* form */}
      <div className="flex-grow-1  w-100 ">
        <form
          className="d-flex flex-column  h-100 justify-content-between"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div>
            <input
              className="form-control mb-2"
              onChange={handleChange}
              id="name"
              name="name"
              placeholder="NAME OF THE ISSUE"
            />
            <input
              className="form-control mb-2"
              onChange={handleChange}
              id="description"
              name="description"
              placeholder="Description"
            />
            <input
              className="form-control mb-2"
              onChange={handleChange}
              id="location"
              name="location"
              placeholder="LOCATION"
            />
            <input
              className="form-control mb-2"
              onChange={handleChange}
              id="additionalNotes"
              name="additionalNotes"
              placeholder="ADDITIONAL NOTES"
            />

            <div>
              <CheckBoxLog onChange={setChecked} checked={checked} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                VISIT THE PROPERTY ANYTIME
              </label>
            </div>
          </div>
          <div>
            <p
              className="text-center"
              style={{ color: "#197572", fontWeight: "500" }}
            >
              {message}
            </p>
          </div>
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#197572",
              outline: "none",
              border: "none",
            }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};
TenantsRepairTicket.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default TenantsRepairTicket;
