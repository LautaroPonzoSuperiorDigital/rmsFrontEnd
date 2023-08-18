/* eslint-disable react/prop-types */

import { useState } from "react";

const titleActiveRepairStyle = {
  color: "#197572",
  fontSize: "20px",
  fontWeight: 600,
  margin: "0px",
  width: "416px",
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
  lineHeight: "1px",
};
const bodyAccordionStyle = {
  backgroundColor: "#31AF9A0D",
};

const ActiveRepairTickets = ({ ticket }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

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
            <div className="d-flex justify-content-between align-items-center">
              <p style={titleRepairStyle}>NAME OF THE ISSUE</p>
              <p style={textIssueRepairStyle}>{ticket.name}</p>
            </div>
            <div>
              <p style={titleRepairStyle}>DESCRIPTION</p>
              <p style={textRepairStyle}>{ticket.description}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p style={titleRepairStyle}>LOCATION</p>
              <p style={textRepairStyle}>{ticket.location}</p>
            </div>
            <div>
              <p style={titleRepairStyle}>ADDITIONAL NOTES</p>
              <p style={textRepairStyle}> {ticket.additionalNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRepairTickets;
