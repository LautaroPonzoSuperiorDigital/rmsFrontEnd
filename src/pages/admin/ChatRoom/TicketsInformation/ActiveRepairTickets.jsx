/* eslint-disable react/prop-types */

import { useState } from "react";
import { api } from "../../../../services/api";

const titleActiveRepairStyle = {
  color: "#197572",
  fontSize: "20px",
  margin: "0px",
  width: "100%",
  backgroundColor: "#31AF9A0D",
};
const titleRepairStyle = {
  color: "#000000A5",
  fontSize: "16px",
  margin: "0px",
};
const textIssueRepairStyle = {
  color: "#00000",
  fontSize: "20px",
  fontWeight: 800,
  margin: "0px",
};
const textRepairStyle = {
  color: "#131313",
  fontSize: "20px",
  margin: "0px",
};
const bodyAccordionStyle = {
  backgroundColor: "#31AF9A0D",
};

const ActiveRepairTickets = ({ ticket, tickets, setTickets }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleStatusChange = async (e) => {
    //update-ticket-repair/:id'
    const status = e.target.value;

    try {
      const response = await api.patch(
        `tenants/update-ticket-repair/${ticket.id}`,
        {
          status: status,
        }
      );

      const newTicket = response.data;
      // I want newTicket replace the one in that matchs in tickets and then setTickets
      const newTickets = tickets.map((ticket) => {
        if (ticket.id === newTicket.id) {
          return newTicket;
        }
        return ticket;
      });
      setTickets(newTickets);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="accordion" id={`accordion-${ticket.id}`}>
      <div className="accordion-item">
        <h2 className="accordion-header" id={`heading-${ticket.id}`}>
          <button
            className={`accordion-button ${isCollapsed ? "" : "collapsed"}`}
            type="button"
            onClick={toggleCollapse}
            aria-expanded={!isCollapsed}
            aria-controls={`collapse-${ticket.id}`}
            style={titleActiveRepairStyle}
          >
            Active Repair Ticket #{ticket.id}
          </button>
        </h2>
        <div
          id={`collapse-${ticket.id}`}
          className={`accordion-collapse collapse ${isCollapsed ? "" : "show"}`}
          aria-labelledby={`heading-${ticket.id}`}
          data-bs-parent={`#accordion-${ticket.id}`}
        >
          <div className="accordion-body" style={bodyAccordionStyle}>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <p style={titleRepairStyle}>NAME OF THE ISSUE</p>
              <p style={textIssueRepairStyle}>{ticket.name}</p>
            </div>
            <div className="d-flex mb-4  flex-column flex-wrap">
              <p style={titleRepairStyle}>DESCRIPTION</p>
              <p style={textRepairStyle}>{ticket.description}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <p style={titleRepairStyle}>LOCATION</p>
              <p style={textRepairStyle}>{ticket.location}</p>
            </div>
            <div>
              <p style={titleRepairStyle}>ADDITIONAL NOTES</p>
              <p style={textRepairStyle}> {ticket.additionalNotes}</p>
            </div>
            <div>
              <p style={titleRepairStyle}>STATUS</p>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleStatusChange}
              >
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRepairTickets;
