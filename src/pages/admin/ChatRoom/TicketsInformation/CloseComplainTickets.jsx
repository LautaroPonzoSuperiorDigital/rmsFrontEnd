import { useState } from "react";

/* eslint-disable react/prop-types */
const titleActiveRepairStyle = {
  color: "#131313",
  fontSize: "20px",
  fontWeight: 100,
  margin: "0px",
  width: "100%",
  backgroundColor: "white",
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

const dateStyle = {
  color: "#848484",
  fontSize: "14px",
  marginLeft: "60px",
  fontWeight: 100,
};

const CloseComplainTickets = ({ ticket }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function formatTimestamp(timestamp) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
  }

  const formattedDate = formatTimestamp(ticket.updatedAt);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="accordion" id={`accordion-${ticket.id}`}>
      <div className="accordion-item">
        <h2 className="accordion-header" id={`heading-${ticket.id}`}>
          <button
            className={`accordion-button ${isCollapsed ? "" : "collapsed"} `}
            type="button"
            onClick={toggleCollapse}
            aria-expanded={!isCollapsed}
            aria-controls={`collapse-${ticket.id}`}
            style={titleActiveRepairStyle}
          >
            Complaint Ticket #{ticket.id}{" "}
            <span style={dateStyle}>{formattedDate}</span>
          </button>
        </h2>
        <div
          id={`collapse-${ticket.id}`}
          className={`accordion-collapse collapse ${isCollapsed ? "" : "show"}`}
          aria-labelledby={`heading-${ticket.id}`}
          data-bs-parent={`#accordion-${ticket.id}`}
        >
          <div className="accordion-body">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <p style={titleRepairStyle}>NAME OF THE ISSUE</p>
              <p style={textIssueRepairStyle}>{ticket.cause}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <p style={titleRepairStyle}>ADDITIONAL NOTES</p>
              <p style={textRepairStyle}>{ticket.additionalNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseComplainTickets;
